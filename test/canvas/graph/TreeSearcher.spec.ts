import { TreeSearcher } from 'app/canvas/tree/TreeSearcher';
import { Tree } from 'app/canvas/tree/Tree';
import { expect } from 'chai';

class Node implements Tree<Node> {
    constructor(
        private number: number,
        private children: Node[] = [],
    ) {}

    public addChild(child: Node) {
        this.children.push(child);
    }

    public isLessThan(vertex: Node): boolean {
        return this.number < vertex.number;
    }

    public getChildren(): Node[] {
        return this.children;
    }
}

describe('TreeSearcher', () => {
    const treeSearcher = new TreeSearcher<Node>();

    describe('#findMinimalLeaf', () => {
        it('should traverse straight paths to the leaf', () => {
            /**
             * root (10) ← a (7) ← b (8) ← c (3)
             */
            const root = new Node(10);
            const a = new Node(7);
            const b = new Node(8);
            const c = new Node(3);

            root.addChild(a);
            a.addChild(b);
            b.addChild(c);


            expect(treeSearcher.findMinimalLeaf(root)).to.equal(c);
        });

        it('should traverse multiple paths to each leaf', () => {
            /**
             * root (10) ← a (7)
             *   ↑     ↖
             *  c (8)   b (3)
             */
            const root = new Node(10);
            const a = new Node(7);
            const b = new Node(3);
            const c = new Node(8);

            root.addChild(a);
            root.addChild(b);
            root.addChild(c);

            expect(treeSearcher.findMinimalLeaf(root)).to.equal(b);
        });

        it('should ignore leafs below max depth', () => {
            /**
             * root (10) ← a (7)
             *   ↑     ↖
             *  c (8)   b (3) ← d (2)
             *   ↑
             *  e (1)
             */
            const root = new Node(10);
            const a = new Node(7);
            const b = new Node(3);
            const c = new Node(8);
            const d = new Node(2);
            const e = new Node(1);

            root.addChild(a);
            root.addChild(b);
            root.addChild(c);
            c.addChild(e);
            b.addChild(d);

            expect(treeSearcher.findMinimalLeaf(root, 1)).to.equal(a);
        });
    });
});
