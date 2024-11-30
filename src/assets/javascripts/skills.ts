import { ApiHandler } from '@/api/ApiHandler';
import type { Tag, TagsByCategory } from './types/Tag';
import type { StrapiResponse } from './types/StrapiResponse';
import { HandleError } from './utils/HandleError';
import { ref, type Ref } from 'vue';
import Matter from 'matter-js';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL,
    apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const tags: Ref<TagsByCategory[] | null> = ref(null);

/**
 * Get all skill tags from Strapi sorted by category
 * @returns a list of skill tags sorted by category
 */
export async function getSkillTags(): Promise<TagsByCategory[] | null> {
    try {
        const t: Tag[] = await apiHandler.get<StrapiResponse<Tag>>('/skill-tags', { populate: '*' }).then((r) => {
            if (!r || !r.data || r.data.length === 0) {
                throw new Error('No skill tags found');
            }

            return r.data;
        });

        const categories: string[] = Array.from(new Set(t.map((tag: Tag) => tag.category))),
            tagsByCategory: TagsByCategory[] = categories.map((c: string) => {
                const tags: Tag[] = t.filter((tag: Tag) => tag.category === c);

                return {
                    category: c,
                    tags: tags
                };
            });

        tags.value = tagsByCategory;

        return tagsByCategory;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));

        return null;
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Matter.js implementation ---------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

const Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events;

const engine = Engine.create(),
    world = engine.world;
let render: Matter.Render,
    runner: Matter.Runner,
    isResizing = false;

/**
 * Initialize Matter.js
 * @param section section containing the boxes
 * @param boxes boxes containing the tags
 */
export function initMatter(section: HTMLElement, boxes: NodeListOf<HTMLElement>): void {
    render = Render.create({
        element: section,
        engine: engine,
        options: {
            wireframes: false,
            showInternalEdges: false,
            width: section.clientWidth,
            height: section.clientHeight,
            background: 'transparent'
        }
    });

    const boxBorders: Matter.Body[] = [];

    boxes.forEach((box) => {
        const positions = [
            { x: box.offsetLeft + box.clientWidth / 2, y: box.offsetTop - 4, width: box.clientWidth + 10, height: 11 },
            {
                x: box.offsetLeft - 4,
                y: box.offsetTop + box.clientHeight / 2,
                width: 11,
                height: box.clientHeight + 20
            },
            {
                x: box.offsetLeft + box.clientWidth / 2,
                y: box.offsetTop + box.clientHeight + 4,
                width: box.clientWidth,
                height: 11
            },
            {
                x: box.offsetLeft + box.clientWidth + 4,
                y: box.offsetTop + box.clientHeight / 2,
                width: 11,
                height: box.clientHeight + 20
            }
        ];

        positions.forEach((pos) => {
            boxBorders.push(Bodies.rectangle(pos.x, pos.y, pos.width, pos.height, { isStatic: true }));
        });
    });

    Composite.add(world, boxBorders);

    engine.gravity.y = 0.6;

    runner = Runner.create();

    Render.run(render);
    Runner.run(runner, engine);
}

/**
 * Spawn tags inside the box
 * @param tags a list of tags from only 1 category
 */
export function spawnTags(box: HTMLElement, tags: NodeListOf<HTMLElement>): void {
    const boxWidth = box.clientWidth;

    tags.forEach((tag, index) => {
        if (isResizing) return;

        setTimeout(
            () => {
                if (isResizing) return;

                tag.style.display = 'flex';

                const tagWidth = tag.clientWidth,
                    tagHeight = tag.clientHeight;

                const randomX = Math.ceil(Math.random() * (boxWidth / 3)) * (Math.round(Math.random()) ? 1 : -1),
                    initPoseX = (boxWidth - tagWidth) / 2 + randomX,
                    initPoseY = tagHeight;

                tag.style.left = `${initPoseX}px`;
                tag.style.top = `${initPoseY}px`;

                const tagBody = Bodies.rectangle(
                    box.offsetLeft + initPoseX + tagWidth / 2,
                    box.offsetTop + initPoseY + tagHeight / 2,
                    tagWidth + 2,
                    tagHeight + 2,
                    {
                        restitution: 0.5,
                        friction: 0.2,
                        chamfer: { radius: 16 },
                        label: 'tag'
                    }
                );

                Events.on(engine, 'afterUpdate', () => {
                    tag.style.left = `${tagBody.position.x - tagWidth / 2 - box.offsetLeft}px`;
                    tag.style.top = `${tagBody.position.y - tagHeight / 2 - box.offsetTop}px`;
                    tag.style.transform = `rotate(${tagBody.angle}rad)`;
                });

                Composite.add(world, tagBody);
            },
            400 * (index + 1)
        );
    });

    punchTags(tags, box);
}

/**
 * Click anywhere inside the box to punch the tags that are inside the explosion radius
 * @param tags array of tags
 * @param box box containing the tags
 */
export function punchTags(tags: NodeListOf<HTMLElement>, box: HTMLElement): void {
    box.addEventListener('click', (event: MouseEvent) => {
        const clickX = event.offsetX,
            clickY = event.offsetY;

        const explosionRadius = 100,
            explosionForce = 0.1;

        const bodies = Composite.allBodies(world),
            tagBodies = bodies.filter((body) => body.label === 'tag');

        for (const tag of tags) {
            const tagX = tag.offsetLeft + tag.clientWidth / 2,
                tagY = tag.offsetTop + tag.clientHeight / 2;

            // Distance tag - click
            const dx = tagX - clickX,
                dy = tagY - clickY,
                d = Math.sqrt(dx * dx + dy * dy);

            if (d <= explosionRadius) {
                const tb = tagBodies.find(
                    (body) =>
                        Math.abs(body.position.x - (tagX + box.offsetLeft)) < 1 &&
                        Math.abs(body.position.y - (tagY + box.offsetTop)) < 1
                );

                if (tb) {
                    const forceMagnitude = (1 - d / explosionRadius) * explosionForce,
                        forceX = (dx / d) * forceMagnitude,
                        forceY = (dy / d) * forceMagnitude;

                    Matter.Body.applyForce(tb, tb.position, {
                        x: forceX,
                        y: forceY
                    });
                }
            }
        }
    });
}

/**
 * On resize :
 * - Remove everything related to Matter.js
 * - Hide the tags
 *
 * After resize :
 * - Re-init Matter.js
 * - Re-spawn tags
 * @param section section containing the boxes
 * @param boxes boxes containing the tags
 * @param tags every tag inside the section
 */
export function watchResize(section: HTMLElement, boxes: NodeListOf<HTMLElement>, tags: NodeListOf<HTMLElement>): void {
    // Timeout to prevent multiple calls to initMatter and spawnTags
    let actionTimeout: number | null = null;

    window.addEventListener('resize', () => {
        isResizing = true;

        Events.off(engine, 'afterUpdate', () => {});
        Composite.clear(world, false, true);

        tags.forEach((tag) => {
            tag.style.display = 'none';
        });

        setTimeout(() => {
            Render.stop(render);
            Runner.stop(runner);

            // Clear the timeout if it's already set
            if (actionTimeout) {
                clearTimeout(actionTimeout);
            }

            // If the user stops resizing for 200ms, re-init Matter.js and re-spawn tags
            actionTimeout = setTimeout(() => {
                isResizing = false;

                initMatter(section, boxes);
                for (const box of boxes) {
                    const boxTags: NodeListOf<HTMLElement> = box.querySelectorAll('.skill-box--tag');

                    spawnTags(box, boxTags);
                }
            }, 500);
        }, 100);
    });
}
