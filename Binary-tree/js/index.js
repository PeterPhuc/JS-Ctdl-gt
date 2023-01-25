class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Binary_Tree {
    constructor(){
        this.root = null;
    }
    // #DQ_insertNode(root, node){
    //     if(root == null) {
    //         return node;
    //     }else{
    //         if(root.data > node.data){
    //             let p = this.#DQ_insertNode(root.left, node);
    //             if(root.left == null) root.left = p;
    //             // console.log(p);
    //         }else{
    //             let p = this.#DQ_insertNode(root.right, node);
    //             if(root.right == null) root.right = p;
    //             // console.log(p);
    //         }
    //     }
    // }
    #DQ_insertNode(root, node){
        if(root.data > node.data){
            if(root.left == null) root.left = node;
            else this.#DQ_insertNode(root.left, node);
        }
        else{
            if(root.right == null) root.right = node;
            else this.#DQ_insertNode(root.right, node);
        }
    }
    InsertNode(data){
        let p = new Node(data)
        if(this.root == null){
            this.root = p;
        }else{
            this.#DQ_insertNode(this.root, p);
        }
    }
    LNR(){
        let array = [];
        (function DQ(root){
            if(root){ 
                DQ(root.left);
                array.push(root.data);
                DQ(root.right);
            }
        })(this.root)
        console.log(array);
    }
    NLR(){
        let array = [];
        (function DQ(root){
            if(root){
                array.push(root.data); 
                DQ(root.left);
                DQ(root.right);
            }
        })(this.root)
        console.log(array);
    }
    #RecursionLeaves(current, data, parent, branch){
        if(current == null)
            return;
        else{
            if(current.data > data)      this.#RecursionLeaves(current.left, data, current, 1);
            else if(current.data < data) this.#RecursionLeaves(current.right, data, current, 2);
            else{
                if(current.left == null && current.right == null){
                    if(branch == 1) parent.left = null;
                    else parent.right = null;
                }
                else  this.#RecursionLeaves(current.right, data, current, 2);
            }
        }
    }
    DelLa(data){
        if(this.root == null)  return;       //Cây rỗng
        else{
            if(!this.root.left && !this.root.right && this.root.data === data)  //Cây có 1 node
                this.root = null;
            else  this.#RecursionLeaves(this.root, data);    //Cây trên 1 node
        }
    }
    #RecursionOneChild(root, data, parent, branch){
        if(root == null)
            return;
        else{
            if(root.data > data)      this.#RecursionOneChild(root.left, data, root, 1);    
            else if(root.data < data) this.#RecursionOneChild(root.right, data, root, 2);
            else{
                if( !root.left && root.right ){            
                    if(branch == 1)                       
                        parent.left = root.right;     
                    else 
                        parent.right = root.right;
                }
                else if( root.left && !root.right ){     
                    if(branch == 1) 
                        parent.left = root.left;
                    else 
                        parent.right = root.left;
                }
                //Nếu ko thì currentNode là node lá hoặc node 2 con 
                else  this.#RecursionOneChild(root.right, data, root, 2);
            }
        }
    }
    DelOneChild(data){
        if(this.root == null)  return; 
        else{
            if(!this.root.left && this.root.right && this.root.data === data) {
                this.root = this.root.right;
            }
            else if(this.root.left && !this.root.right && this.root.data === data) {
                this.root = this.root.left;
            }
            else 
                this.#RecursionOneChild(this.root, data);
        }
    }
    #FindNodeMostLeft(nodeDel, nodeMostLeft, nodeMostLeft_parent, counter = 0){
        if(nodeMostLeft.left != null){
            this.#FindNodeMostLeft(nodeDel, nodeMostLeft.left, nodeMostLeft, 1);
        }else{
            nodeDel.data = nodeMostLeft.data;
            if(counter)
                nodeMostLeft_parent.left = nodeMostLeft.right;
            else
                nodeDel.right = nodeMostLeft.right;
        }
    }
    #RecursionTwoChild(root, data, parentNode, branch){
        if(root == null)
            return;
        else{
            if(root.data > data)      this.#RecursionTwoChild(data, root.left, root, 1);     //Duyệt trái, currentNode là root.left, parentNode là root, nhánh duyệt là left
            else if(root.data < data) this.#RecursionTwoChild(data, root.right, root, 2);
            else{
                if(root.left && root.right){
                    this.#FindNodeMostLeft(root, root.right, root);
                }else 
                    this.#RecursionTwoChild(data, root.right, root, 2);
            }
        }
    }
    DelTwoChild(data){
        this.#RecursionTwoChild(this.root, data);
    }
    FindAllLeaves(){
        let array = [];
        (function DQ(root){
            if(root){ 
                DQ(root.left);
                if(!root.left && !root.right) {
                    array.push(root.data);
                }
                DQ(root.right);
            }
        })(this.root)
        console.log(array);
    }
    FindAllOneChild(){
        let array = [];
        (function DQ(root){
            if(root){ 
                DQ(root.left);
                if( (!root.left && root.right) || (root.left && !root.right) ) {
                    array.push(root.data);
                }
                DQ(root.right);
            }
        })(this.root)
        console.log(array);
    }
    FindAllTwoChild(){
        let array = [];
        (function DQ(root){
            if(root){ 
                DQ(root.left);
                if( root.left && root.right ) {
                    array.push(root.data);
                }
                DQ(root.right);
            }
        })(this.root)
        console.log(array);
    }
    RemoveTree(){
        this.root = null;
    }
}

let tree = new Binary_Tree();
tree.InsertNode(3);
tree.InsertNode(1);
tree.InsertNode(2);
tree.InsertNode(0);
tree.InsertNode(4);
tree.InsertNode(1);
tree.InsertNode(0);
tree.InsertNode(2);
tree.InsertNode(1);
tree.InsertNode(9);

console.log(tree);
tree.LNR();
tree.FindAllLeaves();       // 0, 1, 2, 9
tree.FindAllOneChild();     // 0, 1, 4
tree.FindAllTwoChild();     // 1, 2, 3



// function Test(next, parent){
//     console.log(next);
//     parent.data = 'Tao là next';
// }

// let a = {
//     data: 123,
//     b: {
//         data: "B",
//         next: {
//             data: 'Tôi là next',
//         }
//     }
// }
// Test(a.b.next.data, a.b.next);
// console.log(a);

// console.log('\n\n\n\n');

// function SimpleDQ(n){
//     if(n == 1){
//         return 1;
//     }else{
//         console.log(n);
//         return n * SimpleDQ(n - 1);
//     }
// }
// console.log(SimpleDQ(4));