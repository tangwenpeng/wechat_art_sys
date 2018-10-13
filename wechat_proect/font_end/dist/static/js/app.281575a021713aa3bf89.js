webpackJsonp([1],{"+qiL":function(e,t){},"4EKW":function(e,t){},"53Kd":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("IvJb"),r=n("H93t"),o=n.n(r),i=(n("TsY+"),{render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]});var s=n("C7Lr")({name:"App",data:function(){return{}}},i,!1,function(e){n("Rdln")},null,null).exports,l=n("zO6J"),u=n("rVsN"),c=n.n(u),d=n("aozt"),m=n.n(d);m.a.defaults.baseURL="http://192.168.1.199:8888/admin/Api",m.a.interceptors.request.use(function(e){var t=localStorage.getItem("mytoken");return t?(e.headers.Authorization=t,e):e},function(e){return c.a.reject(e)});var p=function(e){return m.a.get("/showGroup",e).then(function(e){return e.data})},f=function(e){return m.a.get("/modifyUrl/"+e).then(function(e){return e.data})},h=function(e){return m.a.get("/showUsers",e).then(function(e){return e.data})},g={name:"Login",data:function(){return{form:{username:"",password:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{handleLogin:function(e){var t=this;this.$refs.formLogin.validate(function(e){if(!e)return alert("请输入用户名或者密码"),!1;var n;(n=t.form,m.a.post("/login",n).then(function(e){return e.data})).then(function(e){if("1"===e.code){t.$message.success("登录成功");var n=new Date(new Date((new Date).toLocaleDateString()).getTime()+864e5-1).getTime();localStorage.setItem("outTime",n),localStorage.setItem("username",e.data.username),localStorage.setItem("mytoken",e.data.token),localStorage.setItem("isAdmin",e.data.is_admin),t.$router.push({name:"home"})}else t.$message.error(e.message)})})}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("el-form",{ref:"formLogin",staticClass:"login-from",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",[a("div",{staticClass:"login-img"},[a("img",{staticStyle:{width:"120px",height:"120px","margin-left":"-10px","margin-top":"-10px"},attrs:{src:n("lS+k"),alt:"登录图片"}})])]),e._v(" "),a("el-form-item",{attrs:{prop:"username"}},[a("el-input",{attrs:{"prefix-icon":"myicon myicon-user"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"password"}},[a("el-input",{attrs:{type:"password","prefix-icon":"myicon myicon-key"},nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.handleLogin("formLogin")}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"login-btn",on:{click:function(t){e.handleLogin("formLogin")}}},[e._v("登录")])],1)],1)],1)},staticRenderFns:[]};var _=n("C7Lr")(g,v,!1,function(e){n("mdpz")},"data-v-01bb71bd",null).exports,b={wecome:"wecome",group:"group",article:"article",users:"users"},y={name:"Home",data:function(){return{isCollapse:!1,openNav:"",username:"",isAdmin:"",screenWidth:document.body.clientWidth}},methods:{handleOpen:function(){},handleClose:function(){},toggleMenu:function(){this.isCollapse=!this.isCollapse},logout:function(){localStorage.setItem("mytoken",""),localStorage.setItem("username",""),localStorage.setItem("outTime",""),localStorage.setItem("isAdmin",""),this.$router.push({name:"login"})}},mounted:function(){var e,t,n=this;window.onload=function(){window.screenWidth=document.body.clientWidth,n.screenWidth=window.screenWidth},this.screenWidth<640&&(this.isCollapse=!0),(new Date).getTime()>localStorage.getItem("outTime")&&(this.$message.error("请重新登录"),this.logout()),this.username=localStorage.getItem("username"),this.isAdmin=localStorage.getItem("isAdmin"),this.openNav=(e=window.location.href,t=e.split("/home/")[1],b[t])}},w={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("el-container",[n("el-aside",{attrs:{width:"auto"}},[n("div",{staticStyle:{height:"60px"}}),e._v(" "),n("el-menu",{staticClass:"el-menu-admin",attrs:{"default-active":e.openNav,collapse:e.isCollapse,"background-color":"#f9f9f9",router:!0},on:{open:e.handleOpen,close:e.handleClose}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[e.screenWidth<640?e._e():n("i",{staticClass:"el-icon-location"}),e._v(" "),e.screenWidth<640?n("i",{staticStyle:{"margin-left":"-15px"}},[e._v("文章列表")]):e._e(),e._v(" "),n("span",[e._v("文章列表")])]),e._v(" "),n("el-menu-item",{attrs:{index:"article"}},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("文章链接管理")])]),e._v(" "),n("el-menu-item",{attrs:{index:"group"}},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("分组管理")])])],2),e._v(" "),"1"===e.isAdmin?n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[e.screenWidth<640?e._e():n("i",{staticClass:"el-icon-location"}),e._v(" "),e.screenWidth<640?n("i",{staticStyle:{"margin-left":"-15px"}},[e._v("用户列表")]):e._e(),e._v(" "),n("span",[e._v("用户列表")])]),e._v(" "),n("el-menu-item",{attrs:{index:"users"}},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("用户管理")])])],2):e._e()],1)],1),e._v(" "),n("el-container",[n("el-header",[e.screenWidth<640?e._e():n("i",{staticClass:"myicon myicon-menu toggle-btn",on:{click:e.toggleMenu}}),e._v(" "),n("div",{staticClass:"system-title"},[e._v("\n           文案分发管理系统\n         ")]),e._v(" "),n("div",{staticClass:"welcome"},[e.screenWidth<640?e._e():n("span",[e._v("\n             您好，"+e._s(e.username)+"\n           ")]),e._v(" "),n("el-button",{attrs:{type:"warning",round:""},on:{click:e.logout}},[e._v("退出")])],1)]),e._v(" "),n("el-main",[n("router-view")],1)],1)],1)],1)},staticRenderFns:[]};var k=n("C7Lr")(y,w,!1,function(e){n("fLkj")},"data-v-2a62ca98",null).exports,D={render:function(){var e=this.$createElement;return(this._self._c||e)("h2",{staticStyle:{color:"red"}},[this._v("欢迎来到管理系统")])},staticRenderFns:[]},C=n("C7Lr")(null,D,!1,null,null,null).exports,U=n("3cXf"),x=n.n(U),S={name:"Group",data:function(){return{groupData:[],isDisabled:!1}},methods:{getGroupdata:function(){var e=this;p().then(function(t){1===t.code&&(e.groupData=t.groups)})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该分组以及分组下的所有链接, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={group_id:e.toString()};(function(e){return m.a.post("/delGroup",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()(n)).then(function(e){"1"===e.code&&(t.$message({type:"success",message:"删除成功!"}),t.getGroupdata())})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleAdd:function(e){var t=this;this.isDisabled=!0;(function(e){return m.a.post("/showGroup",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()({add_group:"1"})).then(function(e){1===e.code?(t.$message.success("添加分组成功"),t.getGroupdata(),t.isDisabled=!1):(t.$message.error("添加分组失败"),t.isDisabled=!1)})}},mounted:function(){this.getGroupdata()}},$={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"group"},[n("el-button",{attrs:{type:"primary",disabled:e.isDisabled},on:{click:e.handleAdd}},[e._v("添加分組")]),e._v(" "),n("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.groupData,border:""}},[n("el-table-column",{attrs:{label:"组名",prop:"name"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"danger"},on:{click:function(n){e.handleDelete(t.row.group_id)}}},[e._v("删除分组")])]}}])})],1)],1)},staticRenderFns:[]};var A=n("C7Lr")(S,$,!1,function(e){n("rTDO"),n("4EKW")},null,null).exports,T={name:"Article",data:function(){return{articleData:[],groupData:[],value:"",value2:"",editUrl:"",articleId:"",dialogEditUrl:!1,dialogAddUrl:!1,AddUrl:""}},methods:{handleDelete:function(e){var t=this,n={article_id:e};this.$confirm("是否删除该用户","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(function(e){return m.a.post("/delUrl",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()(n)).then(function(e){"1"===e.code&&(t.$message.success("删除链接成功"),f(t.value.toString()).then(function(e){1===e.code?"string"!=typeof e.urls?(t.value=e.urls[0].group_id,t.articleData=e.urls):t.articleData=[]:(t.articleData=e.urls,t.$message.error("查询失败，暂无数据"))}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleAddurl:function(){this.dialogAddUrl=!0},handleEdit:function(e){this.dialogEditUrl=!0,this.articleId=e.article_id,this.editUrl=e.url},handleEditurl:function(){var e=this,t={url:this.editUrl,article_id:this.articleId};(function(e){return m.a.post("/modifyUrl",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()(t)).then(function(t){"1"===t.code&&(e.$message.success("修改链接成功"),e.dialogEditUrl=!1,f(e.value.toString()).then(function(t){1===t.code?"string"!=typeof t.urls?(e.value=t.urls[0].group_id,e.articleData=t.urls):e.articleData=[]:(e.articleData=t.urls,e.$message.error("查询失败，暂无数据"))}))})},handleSearch:function(){var e=this;f(this.value.toString()).then(function(t){1===t.code?"string"!=typeof t.urls?(e.value=t.urls[0].group_id,e.articleData=t.urls):e.articleData=[]:(e.articleData=t.urls,e.$message.error("查询失败，暂无数据"))})},handledialogAddurl:function(){var e=this;if(!/^(http|https):\/\/(mp.weixin.qq.com\/s\/)[\S]?/.test(this.AddUrl))return this.$message.error("请输入正确的链接"),!1;if(!this.value2)return this.$message.error("请选择分组"),!1;var t={group_id:this.value2,url:this.AddUrl};(function(e){return m.a.post("/addUrl",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()(t)).then(function(t){"1"===t.code?(e.$message.success("添加文章链接成功"),e.dialogAddUrl=!1,f(e.value.toString()).then(function(t){1===t.code?"string"!=typeof t.urls?(e.value=t.urls[0].group_id,e.articleData=t.urls):e.articleData=[]:(e.articleData=t.urls,e.$message.error("查询失败，暂无数据"))})):e.$message.erorr("请输入正确的文章链接")})}},mounted:function(){var e=this;f("1").then(function(t){1===t.code?"string"!=typeof t.urls?(e.value=t.urls[0].group_id,e.articleData=t.urls):e.value=1:(e.value=t.group_id,e.articleData=t.urls,e.$message.error("查询失败，暂无数据"))}),p().then(function(t){1===t.code&&(e.groupData=t.groups)})}},E={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"article"},[n("el-button",{attrs:{type:"primary"},on:{click:e.handleAddurl}},[e._v("添加文章链接")]),e._v(" "),n("el-select",{staticStyle:{width:"110px"},attrs:{placeholder:"请选择分组"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.groupData,function(e){return n("el-option",{key:e.value,attrs:{label:e.name,value:e.group_id}})})),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSearch}},[e._v("搜索")]),e._v(" "),n("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.articleData,border:""}},[n("el-table-column",{attrs:{label:"链接名",prop:"article_name"}}),e._v(" "),n("el-table-column",{attrs:{label:"链接",prop:"url"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"danger"},on:{click:function(n){e.handleDelete(t.row.article_id)}}},[e._v("删除文章链接")]),e._v(" "),n("el-button",{attrs:{type:"warning"},on:{click:function(n){e.handleEdit(t.row)}}},[e._v("修改文章链接")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"修改文章链接",visible:e.dialogEditUrl},on:{"update:visible":function(t){e.dialogEditUrl=t}}},[n("el-form",[n("el-form-item",{attrs:{label:"文章链接"}},[n("el-input",{nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleEditurl(t):null}},model:{value:e.editUrl,callback:function(t){e.editUrl=t},expression:"editUrl"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogEditUrl=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleEditurl}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"添加文章链接",visible:e.dialogAddUrl},on:{"update:visible":function(t){e.dialogAddUrl=t}}},[n("el-form",[n("el-form-item",{attrs:{label:"请输入文章链接"}},[n("el-input",{attrs:{rules:{required:!0,message:"链接不能为空",trigger:"blur"},placeholder:"请输入微信文章链接"},model:{value:e.AddUrl,callback:function(t){e.AddUrl=t},expression:"AddUrl"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"请选择分组"}},[n("el-select",{staticStyle:{width:"110px"},attrs:{placeholder:"请选择分组"},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}},e._l(e.groupData,function(e){return n("el-option",{key:e.value,attrs:{label:e.name,value:e.group_id}})}))],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogAddUrl=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handledialogAddurl}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var L=n("C7Lr")(T,E,!1,function(e){n("53Kd"),n("WRgV")},"data-v-38fb1758",null).exports,I={name:"Users",data:function(){return{userData:[]}},methods:{handleDeleteUser:function(e){var t=this,n={user_id:e};this.$confirm("是否删除该用户","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){(function(e){return m.a.post("/showUsers",e,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(function(e){return e.data})})(x()(n)).then(function(e){"1"===e.code&&(t.$message.success("删除用户成功"),h().then(function(e){if("1"===e.code){for(var n=0;n<e.users.length;n++)e.users[n].create_time=e.users[n].create_time.substring(0,10);t.userData=e.users}}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}},mounted:function(){var e=this;h().then(function(t){if("1"===t.code){for(var n=0;n<t.users.length;n++)t.users[n].create_time=t.users[n].create_time.substring(0,10);e.userData=t.users}})}},W={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"users"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userData,border:""}},[n("el-table-column",{attrs:{prop:"username",label:"用户名"}}),e._v(" "),n("el-table-column",{attrs:{label:"权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s("1"===t.row.is_admin?"管理员":"普通用户"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"create_time",label:"创建时间"}}),e._v(" "),n("el-table-column",{attrs:{label:"用户状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s("1"===t.row.is_delete?"已删除":"正常"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"!==t.row.is_delete?n("el-button",{attrs:{type:"danger"},on:{click:function(n){e.handleDeleteUser(t.row.user_id)}}},[e._v("删除用户")]):e._e()]}}])})],1)],1)},staticRenderFns:[]};var F=n("C7Lr")(I,W,!1,function(e){n("zKMm")},"data-v-2f2e2b82",null).exports;a.default.use(l.a);var R=new l.a({routes:[{name:"login",path:"/login",component:_},{name:"home",path:"/home",component:k,redirect:{name:"wecome"},children:[{name:"wecome",path:"wecome",component:C},{name:"group",path:"group",component:A},{name:"article",path:"article",component:L},{name:"users",path:"users",component:F}]},{path:"*",redirect:{name:"wecome"}}]});n("+qiL");a.default.config.productionTip=!1,a.default.use(o.a),R.beforeEach(function(e,t,n){localStorage.getItem("mytoken")?n():"/login"!==e.path?n({path:"/login"}):n()}),new a.default({el:"#app",router:R,components:{App:s},template:"<App/>"})},Rdln:function(e,t){},"TsY+":function(e,t){},WRgV:function(e,t){},fLkj:function(e,t){},"lS+k":function(e,t,n){e.exports=n.p+"static/img/avatar.520d72a.jpg"},mdpz:function(e,t){},rTDO:function(e,t){},zKMm:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.281575a021713aa3bf89.js.map