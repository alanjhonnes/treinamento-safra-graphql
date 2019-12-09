export interface Entity {
    id: number;
}

export const byId = (id: number) => (entity: Entity) => entity.id === id;

export const byIds = (ids: number[]) => (entity: Entity) => ids.includes(entity.id);
