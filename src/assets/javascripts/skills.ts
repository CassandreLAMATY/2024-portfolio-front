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
    Runner = Matter.Runner;

const engine = Engine.create(),
    world = engine.world;

export function initMatter(section: HTMLElement, boxes: NodeListOf<HTMLElement>): void {
    // create a renderer
    const render = Render.create({
        element: section,
        engine: engine,
        options: {
            wireframes: false,
            showInternalEdges: false,
            width: section.clientWidth,
            height: section.clientHeight
        }
    });

    const boxBorders: Matter.Body[] = [];

    for (const box of boxes) {
        const boxBorder = [
            Bodies.rectangle(box.offsetLeft + box.clientWidth / 2, box.offsetTop - 4, box.clientWidth + 10, 11, {
                isStatic: true
            }),
            Bodies.rectangle(box.offsetLeft - 4, box.offsetTop + box.clientHeight / 2, 11, box.clientHeight + 20, {
                isStatic: true
            }),
            Bodies.rectangle(
                box.offsetLeft + box.clientWidth / 2,
                box.offsetTop + box.clientHeight + 4,
                box.clientWidth,
                11,
                {
                    isStatic: true
                }
            ),
            Bodies.rectangle(
                box.offsetLeft + box.clientWidth + 4,
                box.offsetTop + box.clientHeight / 2,
                11,
                box.clientHeight + 20,
                {
                    isStatic: true
                }
            )
        ];

        boxBorders.push(...boxBorder);
    }

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

    let i: number = 1;
    for (const tag of tags) {
        setTimeout(() => {
            tag.style.display = 'flex';

            const tagWidth = tag.clientWidth;
            const tagHeight = tag.clientHeight;

            const randomX: number = Math.ceil(Math.random() * (boxWidth / 3)) * (Math.round(Math.random()) ? 1 : -1);
            const initPoseX: number = (boxWidth - tagWidth) / 2 + randomX;
            const initPoseY: number = tagHeight;

            tag.style.left = `${initPoseX}px`;
            tag.style.top = `${initPoseY}px`;

            const tagBody = Matter.Bodies.rectangle(
                box.offsetLeft + initPoseX + tagWidth / 2,
                box.offsetTop + initPoseY + tagHeight / 2,
                tagWidth + 1,
                tagHeight + 1,
                {
                    restitution: 0.5,
                    friction: 0.2,
                    chamfer: {
                        radius: 16
                    }
                }
            );

            // Link canvas tags to the DOM elements
            Matter.Events.on(engine, 'afterUpdate', () => {
                tag.style.left = `${tagBody.position.x - tagWidth / 2 - box.offsetLeft}px`;
                tag.style.top = `${tagBody.position.y - tagHeight / 2 - box.offsetTop}px`;
                tag.style.transform = `rotate(${tagBody.angle}rad)`;
            });

            Composite.add(world, tagBody);
        }, 400 * i);

        i++;
    }
}
