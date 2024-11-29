import { ApiHandler } from '@/api/ApiHandler';
import type { Tag, TagsByCategory } from './types/Tag';
import type { StrapiResponse } from './types/StrapiResponse';
import { HandleError } from './utils/HandleError';
import { ref, type Ref } from 'vue';
import Matter from 'matter-js';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL;
const apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const tags: Ref<TagsByCategory[] | null> = ref(null);

export async function getSkillTags(): Promise<TagsByCategory[] | null> {
    try {
        const t: Tag[] = await apiHandler.get<StrapiResponse<Tag>>('/skill-tags', { populate: '*' }).then((r) => {
            if (!r || !r.data || r.data.length === 0) {
                throw new Error('No skill tags found');
            }

            return r.data;
        });

        const categories: string[] = Array.from(new Set(t.map((tag: Tag) => tag.category)));
        const tagsByCategory: TagsByCategory[] = categories.map((c: string) => {
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
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

const Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events;

const engine = Engine.create(),
    world = engine.world;

export function initMatter(section: HTMLElement, boxes: NodeListOf<HTMLElement>): void {
    const render = Render.create({
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

    Render.run(render);
    Runner.run(Runner.create(), engine);
}

/**
 *
 * @param tags a list of tags from only 1 category
 * @returns
 */
export function spawnTags(box: HTMLElement, tags: NodeListOf<HTMLElement>): void {
    const boxWidth = box.clientWidth;

    tags.forEach((tag, index) => {
        setTimeout(
            () => {
                tag.style.display = 'flex';

                const tagWidth = tag.clientWidth;
                const tagHeight = tag.clientHeight;

                const randomX = Math.ceil(Math.random() * (boxWidth / 3)) * (Math.round(Math.random()) ? 1 : -1);
                const initPoseX = (boxWidth - tagWidth) / 2 + randomX;
                const initPoseY = tagHeight;

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
                        chamfer: { radius: 16 }
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

export function punchTags(tags: NodeListOf<HTMLElement>, box: HTMLElement): void {
    box.addEventListener('click', (event: MouseEvent) => {
        const clickX = event.clientX - box.offsetLeft;
        const clickY = event.clientY - box.offsetTop;

        console.log('Clic détecté dans la boîte aux coordonnées :', clickX, clickY);

        const explosionRadius = 100;
        const explosionForce = 0.05;

        // Obtenir tous les corps dans le monde Matter.js
        const bodies = Composite.allBodies(world);

        tags.forEach((tag) => {
            const tagRect = tag.getBoundingClientRect();
            const tagX = tagRect.left + tagRect.width / 2 - box.offsetLeft;
            const tagY = tagRect.top + tagRect.height / 2 - box.offsetTop;

            console.log('Position du tag :', tagX, tagY);

            const dx = tagX - clickX;
            const dy = tagY - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= explosionRadius) {
                const tagBody = bodies.find(
                    (body) =>
                        Math.abs(body.position.x - (tagX + box.offsetLeft)) < 1 &&
                        Math.abs(body.position.y - (tagY + box.offsetTop)) < 1
                );

                if (tagBody) {
                    const forceMagnitude = (1 - distance / explosionRadius) * explosionForce;
                    const forceX = (dx / distance) * forceMagnitude;
                    const forceY = (dy / distance) * forceMagnitude;

                    console.log('Force appliquée :', forceX, forceY);

                    Matter.Body.applyForce(tagBody, tagBody.position, {
                        x: forceX,
                        y: forceY
                    });
                }
            }
        });
    });
}
