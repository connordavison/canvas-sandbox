export interface Tree<Node extends Tree<Node>> {
    isLessThan(node: Node): boolean;
    getChildren(): Node[];
}
