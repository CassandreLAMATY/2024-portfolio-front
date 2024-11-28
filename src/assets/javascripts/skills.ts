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
            wireframes: true,
            showInternalEdges: true,
            width: section.clientWidth,
            height: section.clientHeight,
            background: 'black'
        }
    });

    const boxBorders: Matter.Body[] = [];

    for (const box of boxes) {
        const boxBorder = [
            Bodies.rectangle(
                box.offsetLeft + box.clientWidth / 2,
                box.offsetTop - section.offsetTop - 5,
                box.clientWidth,
                5,
                {
                    isStatic: true
                }
            ),
            Bodies.rectangle(
                box.offsetLeft - 5,
                box.offsetTop - section.offsetTop + box.clientHeight / 2,
                5,
                box.clientHeight,
                {
                    isStatic: true
                }
            ),
            Bodies.rectangle(
                box.offsetLeft + box.clientWidth / 2,
                box.offsetTop - section.offsetTop + box.clientHeight + 5,
                box.clientWidth,
                5,
                {
                    isStatic: true
                }
            ),
            Bodies.rectangle(
                box.offsetLeft + box.clientWidth + 5,
                box.offsetTop - section.offsetTop + box.clientHeight / 2,
                5,
                box.clientHeight,
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
export function spawnTags(section: HTMLElement, box: HTMLElement, tags: NodeListOf<HTMLElement>): void {
    let i: number = 1;
    for (const tag of tags) {
        setTimeout(() => {
            tag.style.display = 'flex';
            const sectionRect: DOMRect = section.getBoundingClientRect();
            const boxRect: DOMRect = box.getBoundingClientRect();
            const tagRect: DOMRect = tag.getBoundingClientRect();

            const randomX: number =
                Math.ceil(Math.random() * (boxRect.width / 3)) * (Math.round(Math.random()) ? 1 : -1);

            tag.style.left = `${(boxRect.width - tagRect.width) / 2 + randomX}px`;

            if (tag.style.left) {
                const initPose: number = tag.style.left
                    ? parseFloat(tag.style.left.substring(0, tag.style.left.length - 2))
                    : (boxRect.width - tagRect.width) / 2;

                const tagBody = Matter.Bodies.rectangle(
                    initPose + boxRect.left + tagRect.width / 2,
                    boxRect.top - sectionRect.top + tagRect.height,
                    tagRect.width,
                    tagRect.height,
                    {
                        restitution: 0.5,
                        friction: 0.3,
                        chamfer: {
                            radius: 16
                        }
                    }
                );

                Composite.add(world, tagBody);
            }
        }, 400 * i);

        i++;
    }
}
