export function transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

    fields.forEach((field) => {
        transformed[field] = this[field];
    });

    return transformed;
}
