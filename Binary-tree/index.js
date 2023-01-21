class Binary_tree {
    constructor(array = []){
        for(let i of array){
            this.Add_Node(i);
        }
    }
    //Gán giá trị cho node
    #setNode(node, data, left={}, right={}){
        node.data = data;
        node.left = left;
        node.right = right;
    }
    //Check empty node
    #Tree_IsEmpty(tree) {
        if(!Object.keys(tree).length || tree.data == undefined)
            return 0;
        return 1;
    }
    #InsertNode(tree, data) {
        if(!this.#Tree_IsEmpty(tree))  this.#setNode(tree, data, {}, {});
        else{                              
            if(tree.data > data)  this.#InsertNode(tree.left, data); 
            else  this.#InsertNode(tree.right, data);
        }
    }
    //Duyệt node: Left Node Right
    LNR(){
        let array = [];
        let _this = this;
        (function DQ(tree){
            if(_this.#Tree_IsEmpty(tree)){
                DQ(tree.left); 
                array.push(tree.data);
                DQ(tree.right);
            }
        })(this);
        console.log(array);
    }
    //Duyệt node: Right Node Left
    RNL(){
        let array = [];
        let _this = this;
        (function DQ(tree){
            if(_this.#Tree_IsEmpty(tree)){
                DQ(tree.right);
                array.push(tree.data);
                DQ(tree.left);
            }
        })(this);
        console.log(array);
    }
    //Thêm node mới
    Add_Node(data){
        if(data == undefined){
            return;
        }
        this.#InsertNode(this, data);
    }
    //Clear 1 node
    #Del_A_Node(tree){
        for(let keys in tree){
            if(tree.hasOwnProperty(keys))
                delete tree[keys];
        }
    }
    //Đệ quy xóa node lá
    #DQ_DelLa(tree, data){     
        if(!this.#Tree_IsEmpty(tree)) return;
        else{
            if(tree.data > data)         this.#DQ_DelLa(tree.left, data);
            else if(tree.data < data)    this.#DQ_DelLa(tree.right, data);
            else{
                if(!this.#Tree_IsEmpty(tree.left) && !this.#Tree_IsEmpty(tree.right))
                    this.#Del_A_Node(tree);
                else
                    this.#DQ_DelLa(tree.right, data);
            }
        }
    }
    #DQ_DelOneKid(tree, data){
        if(!this.#Tree_IsEmpty(tree)) return;
        else{
            if(tree.data > data)        this.#DQ_DelOneKid(tree.left, data);
            else if(tree.data < data)   this.#DQ_DelOneKid(tree.right, data);
            else{
                if( (!this.#Tree_IsEmpty(tree.left) && this.#Tree_IsEmpty(tree.right)) ||
                    (this.#Tree_IsEmpty(tree.left) && !this.#Tree_IsEmpty(tree.right))  ){

                        if(!this.#Tree_IsEmpty(tree.left))
                            this.#setNode(tree, tree.right.data, tree.right.left, tree.right.right);
                        else if(!this.#Tree_IsEmpty(tree.right))
                            this.#setNode(tree, tree.left.data, tree.left.left, tree.left.right);

                }
                else  this.#DQ_DelOneKid(tree.right, data);
            }
        }
    }
    //Tìm node trái nhất
    #NodeMostLeft(x, y){
        if(this.#Tree_IsEmpty(y.left)){
            this.#NodeMostLeft(x, y.left);
        }
        else{ 
            x.data = y.data;
            this.#setNode(y, y.right.data, y.right.left, y.right.right);
        } 
    }
    #DQ_DelDouKid(tree, data){
        if(!this.#Tree_IsEmpty(tree)) return;
        else{
            if(tree.data > data)        this.#DQ_DelDouKid(tree.left, data);
            else if(tree.data < data)   this.#DQ_DelDouKid(tree.right, data);
            else{
                if( this.#Tree_IsEmpty(tree.left) && this.#Tree_IsEmpty(tree.right) ){   //KT node này có mấy con
                    this.#NodeMostLeft(tree, tree.right);
                }
                else  this.#DQ_DelDouKid(tree.right, data);
                
                // const temp = {};
                // _this.#setNode(temp, tree.data, tree.left, tree.right);
        
                // if(!_this.#Tree_IsEmpty(tree.left)){
                //     _this.#setNode(tree, tree.right.data, tree.right.left, tree.right.right);
                // }
                // else{
                //     if(!_this.#Tree_IsEmpty(tree.right)) {
                //         _this.#setNode(tree, tree.left.data, tree.left.left, tree.left.right);
                //     }
                //     else if(!_this.#Tree_IsEmpty(tree.left)) {
                //         _this.#setNode(tree, tree.right.data, tree.right.left, tree.right.right);
                //     }
                //     else {
                //         _this.#searchStandFor(tree, tree.right);
                //         // _this.#setNode(tree, temp.data, temp.left, temp.right);  
                //     }
                // }
            }
        }
    }
    //Tìm all node 2 con
    FindNodeTwoKid(){
        let array = [];
        let _this = this;
        (function DQ(tree){
            if(_this.#Tree_IsEmpty(tree)){
                DQ(tree.left); 
                if(_this.#Tree_IsEmpty(tree.left) && _this.#Tree_IsEmpty(tree.right)){
                    array.push(tree.data);
                }
                DQ(tree.right);
            }
        })(this);
        console.log(array);
    }
    //Tìm all node 1 con
    FindNodeOneKid(){
        let array = [];
        let _this = this;
        (function DQ(tree){
            if(_this.#Tree_IsEmpty(tree)){
                DQ(tree.left); 
                if((!_this.#Tree_IsEmpty(tree.left) && _this.#Tree_IsEmpty(tree.right)) ||
                (_this.#Tree_IsEmpty(tree.left) && !_this.#Tree_IsEmpty(tree.right))){
                    array.push(tree.data);
                }
                DQ(tree.right);
            }
        })(this);
        console.log(array);
    }
    //Tìm all node lá
    FindNodeLa(){
        let array = [];
        let _this = this;
        (function DQ(tree){
            if(_this.#Tree_IsEmpty(tree)){
                DQ(tree.left); 
                if(!_this.#Tree_IsEmpty(tree.left) && !_this.#Tree_IsEmpty(tree.right)){
                    array.push(tree.data);
                }
                DQ(tree.right);
            }
        })(this);
        console.log(array);
    }
    //Xóa node lá
    Mt_DelLa(data){
        this.#DQ_DelLa(this, data);
    }
    //Xóa node 1 con
    Mt_DelOneKid(data){
        this.#DQ_DelOneKid(this, data);
    }
    //Xóa node 2 con
    Mt_DelTwoKid(data){
        this.#DQ_DelDouKid(this, data);
    }
    //Hủy cây BTS
    RemoveTree(){
        for(let i in this){
            delete this[i];
        }
    }
}

//Example demo
const Treenp = new Binary_tree([1,2,3,4]);   //Khởi tạo cây
Treenp.Add_Node(5);                          //Thêm 1 node
Treenp.LNR();                                //Duyệt cây theo kiểu LNR