/**
 * author: @jinqian
 */
let app = {
    way : {}
};

app.way = {
    $ : function(selector,node){
        return (node || document).querySelector(selector)
    }
};

;(function(way){
    let $ = way.$;
    let ipt = $('#ipt input');
    let content = $('#content');

    class Note {
        constructor(){
            this.init()
            this.addEvent()
        };
        addEvent(){
            let that = this;
            let addMes = function(e){
                //确认是否是回车键
                if(e.keyCode !== 13)return;
                let val = ipt.value.trim(); // 去除输入字符串的首尾空格
                // 判断localstorage中有误toadd 若无则设置
                if(that.get('toadd') === null){
                    that.set('toadd',[])
                }
                let arr = that.get('toadd'); // 获取toadd的值
                content.innerHTML += `
                    <div class="u-message">
                        <p>${val}</p>
                        <span>X</span>
                    </div>
                `;
                arr.push({
                    content : val,
                    done : false
                });
                that.set('toadd',arr);
                this.value = '' // 清空input
            }
            //文档输入并添加到页面
            ipt.addEventListener('keyup',addMes)

            //改变状态的点击事件
            let change = function (e){
                let targt = e.target;
                let arr = that.get('toadd');
                if(targt.tagName === 'SPAN'){
                    arr.forEach(function (val,idx,arr) {
                        if(this === content.children[idx]){
                            content.removeChild(this);
                            arr.splice(idx,1)
                            localStorage.clear();
                            that.set('toadd',arr)
                        }
                    },targt.parentNode)

                }else if(targt.tagName === 'P'){
                    arr.forEach(function (val,idx,arr) {
                        // console.log(val)
                        if(this === content.children[idx]){
                            val.done = !val.done;
                            this.firstChild.className = val.done ? 'done' : '';
                            localStorage.clear();
                            that.set('toadd',arr);
                        }
                    },targt.parentNode)
                }
            }
            document.addEventListener('click',change);
        };
        //页面初始化
        init(){
            if(this.get('toadd') === null){
                this.set('toadd',[])
            }
            let arr = this.get('toadd');
            arr.forEach((value) => {
                let status = value.done ? 'done' : ''
                content.innerHTML += `
                <div class="u-message">
                <p class="${status}">${value.content}</p>
                <span>X</span>
            </div>
            `
            })
        };

        set(key,val){
            localStorage.setItem(key,JSON.stringify(val))
        };
        get(val){
            return JSON.parse(localStorage.getItem(val))
        }

    }


    // function Note(){
    //     this.init()
    //     this.addEvent()
    // }
    //
    // //事件监听
    // Note.prototype.addEvent = function(){
    //     that = this;
    //     let addMes = function(e){
    //         if(e.keyCode !== 13)return;
    //         let val = ipt.value.trim();
    //
    //         if(that.get('toadd') === null){
    //             that.set('toadd',[])
    //         }
    //
    //         let arr = that.get('toadd');
    //         // console.log(arr)
    //         content.innerHTML += `
    //         <div class="u-message">
    //             ${val}
    //             <span>X</span>
    //         </div>
    //         `;
    //
    //         arr.push({
    //             content : val,
    //             done : false
    //         });
    //         that.set('toadd',arr);
    //         this.value = ''
    //     }
    //     //文档输入并添加到页面
    //     ipt.addEventListener('keyup',addMes)
    //
    //     //改变状态的点击事件
    //     let change = function (e){
    //         let targt = e.target;
    //         let arr = that.get('toadd');
    //         if(targt.tagName === 'SPAN'){
    //             arr.forEach(function (val,idx,arr) {
    //                 if(this === content.children[idx]){
    //                     content.removeChild(this);
    //                     arr.splice(idx,1)
    //                 }
    //             },targt.parentNode)
    //
    //         }else if(targt.tagName === 'P'){
    //             arr.forEach(function (val,idx) {
    //                 // console.log(val)
    //                 if(this === content.children[idx]){
    //                     val.done = !val.done;
    //                 }
    //             },targt)
    //         }
    //     }
    //     document.addEventListener('click',change);
    // }
    // //页面初始化
    // Note.prototype.init = function(){
    //     let arr = this.get('toadd');
    //     arr.forEach((value) => {
    //         content.innerHTML += `
    //             <div class="u-message">
    //             ${value.content}
    //             <span>X</span>
    //         </div>
    //         `
    //     })
    // }
    //
    // // 设置localstorage
    // Note.prototype.set = function(key,val){
    //     localStorage.setItem(key,JSON.stringify(val))
    // };
    // //获取localstorage
    // Note.prototype.get = function(val){
    //     return JSON.parse(localStorage.getItem(val))
    // };

    
    //创建
    document.addEventListener('DOMContentLoaded',function(e){
        new Note()
    })
}(app.way))