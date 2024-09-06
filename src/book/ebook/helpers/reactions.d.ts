export type Reaction = {
    title: 'angry' | 'smile' | 'cry' | 'unbelievable' | 'thinking' | 'note';
    alt: string;
    gif: string;
    altEmoji: string;
    description: string;
    svg: string;
};
export declare const reactions: Reaction[];
export type reactionsTitles = (typeof reactions)[number]['title'];
