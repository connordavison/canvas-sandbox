import { Tree } from 'app/canvas/tree/Tree';

export class TreeSearcher<V extends Tree<V>> {
    public findMinimalLeaf(
        tree: V,
        maxDepth = Infinity,
    ): V|undefined {
        const children = tree.getChildren();

        if (children.length === 0) {
            return tree;
        }

        if (maxDepth === 0) {
            return undefined;
        }

        let best = undefined;

        for (const child of children) {
            const minimal = this.findMinimalLeaf(child, maxDepth - 1);

            if (minimal === undefined) {
                continue;
            }

            if (
                best === undefined
                || minimal.isLessThan(best)
            ) {
                best = minimal;
            }
        }

        return best;
    }
}
