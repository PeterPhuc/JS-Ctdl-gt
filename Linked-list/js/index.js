// 'use strict';
class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = new Node();
        //this.tail = new Node();
    }
    #DQAddTail(head, node){
        if(!head.next){          //head.next == null
            head.next = node;
            //this.tail = node;
            // console.log(head.next === this.tail);   //true
        }else this.#DQAddTail(head.next, node);
    }
    Insert_head(data){
        let node = new Node(data);
        if(this.head.data == undefined){
            this.head = node;        //head and tail point to the same memo address
            //this.tail = node;
        }else{
            node.next = this.head;
            this.head = node;
        }
    }

    Insert_tail(data){
        let node = new Node(data);
        if(this.head.data == undefined){
            this.head = node;
        }
        else this.#DQAddTail(this.head, node);
    }
/*    Insert_tail(data){
        let node = new Node(data);
        if(this.head.data == undefined){
            this.head = node;       //(*) head and tail point to the same memo address
            //this.tail = node; 
        }else{
            this.tail.next = node;  
            //this.tail = node;       //Dễ hiểu hơn: this.tail = this.tail.next cũng đc
            //(x) now, THE DEEPEST OBJ of head and tail will point to the same memo address, (*) at this time not true
            //so that change property of tail, THE DEEPEST OBJ of head will same


            //Ban đầu, head và tail cùng vùng nhớ
    //(++)  //Sau đó gán tail.next = node có nghĩa là tương đương head.next.next.... = node
            //==> head đã bị thay đổi, cụ thể là thêm 1 obj con
            //Sau đó tail sẽ bị gán = node 
            //==> head và tail mất liên lạc, nhưng (x)-THE DEEPEST OBJ of head và tail- thì chung vùng nhớ
            //Cho nên, khi insertNode 2 lần trở lên thì quay lại (++) và cứ thế

            //Mấu chốt vấn đề là ở điều kiện if ấy, để cho head và tail chung ô nhớ trước
            //Từ else là head và tail ko chung ô nhớ nữa, mà tail chỉ chung ô nhớ với THE DEEPEST OBJ của head :))

            //Đó là kết quả của việc vận dụng tính bắc cầu
            //b = a;
            //c = a;     ==> b chung ô nhớ c (a, b, c là kiểu tham chiếu, thay đổi property trong b thì a, c bị ảnh hưởng lun)

            //Mục đích cuối cùng muốn cho tail chung ô nhớ với THE DEEPEST OBJ của head là để thay đổi gián tiếp THE DEEPEST OBJ của head THÔNG QUA tail.next đó mà :))
            //Xong ròi cho tail = tail.next <==> tail = THE DEEPEST OBJ để lần sau có InsertTail nữa thì thay đổi tail. next là oke



            // this.#DQAddTail(this.head, node);    //Cách 2 dùng đệ quy head
        }
    }

*/
    Insert_At(index, data){
        let p = new Node(data);

        if(index < 0 || index > this.size()) 
            return;
        else {
            if(index === 0) 
                this.Insert_head(data);
            else if(index === this.size()) 
                this.Insert_tail(data);
            else {
                let count = 0;
                let i = this.head;
                while(i){
                    count++;
                    if(count === index){
                        p.next = i.next;
                        i.next = p;
                        return;
                    }
                    i = i.next;
                }
            }
        }
    }
    DuyetDSLK(){
        let array = [];
        let i = this.head;   
        while(i){     
            array.push(i.data);
            i = i.next;
        }
        console.log(array);
    }
    size() {
        let counter = 0;
        let i = this.head;   
        while(i){     
            counter++;
            i = i.next;
        }
        return counter;
    }
    Delete_First(){
        if(this.head.data == undefined){      //ds rỗng
            return;
        }else{
            if(!this.head.next){              //ds có 1 phần tử
                //this.tail = new Node();         
                this.head = new Node();      
            } 
            else                              //ds có 2 phần tử đổ lên
                this.head = this.head.next;
        }
    }
    Delete_Last(){
        if(this.head.data == undefined){      //ds rỗng
            return;
        }
        else{      
            if(!this.head.next){              //ds chỉ có 1 phần tử
                this.Delete_First();
                return;
            }      

            //ds có 2 phần tử đổ lên
            for(let i = this.head; i != null; i=i.next){
                if(i.next.next === null){
                   i.next = null; 
                   //this.tail = i;
                   return;
                }
            } 
        }
    }
    Delete_At(index, data){
        if(index < 0 || index >= this.size()) return;
        else {
            if(index === 0) 
                this.Delete_First(data);
            else if(index === this.size() - 1)
                this.Delete_Last(data);
            else {
                let count = 0;
                let i = this.head;
                while(i){
                    count++;
                    if(index === count){
                        i.next = i.next.next;
                        return;
                    }
                    i = i.next;
                }
            }
        }
    }
    getNodeAt(index){
        if(index < 0 || index >= this.size()) return;
        else {
            let count = 0;
            let i = this.head;
            while(i){
                if(index === count){
                    return i;
                }
                count++;
                i = i.next;
            }
        }
    }
    updateNodeAt(index, node){
        let nodeIndex = this.getNodeAt(index);
        nodeIndex.data = node.data;
    }
    ClearList(){
        this.head = new Node();
        //this.tail = new Node();
    }
}

let p = new LinkedList();           //index của dslk đơn bắt đầu từ 0

p.Insert_tail(1);     //0
p.Insert_tail(2);     //1
p.Insert_tail(3);     //2
p.Insert_tail(4);     //3
p.Insert_tail(5);     //4
p.Insert_tail(6);     //5


p.Delete_At(p.size() - 1);        //1 2 3 4 5
p.Insert_At(p.size(), 10);        //1 2 3 4 5 10
p.Delete_At(4);                   //1 2 3 4 10
p.Insert_At(5, 20);               //1 2 3 4 10 20
p.Delete_At(4);                   //1 2 3 4 20
p.Insert_At(4, 50);               //1 2 3 4 50 20
p.Delete_At(0);                   //2 3 4 50 20
console.log(p);
p.getNodeAt(4).data = 1000;       //2 3 4 50 1000
p.updateNodeAt(2, new Node(3000));//2 3 3000 50 1000











// console.log(a.#head);

// function test(){
//     abc = 'cskcns';
// }

// test();
// console.log(this);