<script>
    /**
     * API请求统一管理模块
     *
     * @Author XiongCheng
     * @version V1.0
     * @Date 2018-04-14 16:52.
     */
    import urlCollection from "@/util/RequestUrl";
    import { Notification } from 'element-ui';
    export default {
        requestMethod(method,requestUrl,data,callback) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url:requestUrl,
                crossDomain: true,
                type: method,
                datatype:'json',
                contentType: "application/json",
                data: data,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest.status+"\r\n"+XMLHttpRequest.readyState+"\r\n"+textStatus);
                    Notification.error({
                        title: '请求失败',
                        message: '向服务端请求失败'
                    })
                },
                success: callback
            });
        },
        getUserInfo() {

        },
        getBulletinBoards(callerContext,pageNum) {
            let url = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.url + "/1/1/1";
            let method = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.requestMethod;
            this.requestMethod(method,url,null,function (data) {
                callerContext.bulletinBoard = data.data.pageInfo.list;
            });
        },
        getLatestNews(callerContext,pageNum) {
            let url = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.url + "/1/2/1";
            let method = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.requestMethod;
            this.requestMethod(method,url,null,function (data) {
                callerContext.latestNew = data.data.pageInfo.list;
            });
        },
        getInformation(callerContext,pageNum) {
            let url = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.url + "/1/3/1";
            let method = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.requestMethod;
            this.requestMethod(method,url,null,function (data) {
                callerContext.info = data.data.pageInfo.list;
            });
        },
        getViolationData(callerContext,queryData,pageNum) {
            let url = urlCollection.vioInfo.publicMethod.getVioInfo.url;
            let method = urlCollection.vioInfo.publicMethod.getVioInfo.requestMethod;
            url = url + "?" + $.param(queryData);
            this.requestMethod(method,url,null,function (data) {
                data = data.data;
                console.log(data.data);
                callerContext.tableData = data.data;
                callerContext.totalData = data.pageInfo.total;
            });
        },
        adminGetViolatinData(callerContext,pageNum){
            let url = urlCollection.vioInfo.authMethod.admin.getAllInfo.url + "?page=" + pageNum;
            let method = urlCollection.vioInfo.authMethod.admin.getAllInfo.requestMethod;
            this.requestMethod(method,url,null,function (data) {
                callerContext.tableData = data.data.pageInfo.list;
                callerContext.totalPageNum = data.data.pageInfo.total;
            })
        },
        addBulletin(callerContext,data) {
            let url = urlCollection.bulletinBoard.authMethod.admin.addBulletinBoard.url;
            let method = urlCollection.bulletinBoard.authMethod.admin.addBulletinBoard.requestMethod;
            this.requestMethod(method,url,data,function (respData) {
                callerContext.$notify({
                    title: '添加成功',
                    message: '公告信息添加成功',
                    type: 'success'
                });
            });
        },
        getAllBulletin(callerContext,data){
            let url = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.url + "/4/1/1";
            let method = urlCollection.bulletinBoard.publicMethod.getBulletinBoards.requestMethod;
            this.requestMethod(method,url,null,function (respData) {
                callerContext.tableData = respData.data.pageInfo.list;
                callerContext.totalPageNum = respData.data.pageInfo.total;
            });
        },
        modifyBulletin(callerContext,data) {
            let url = urlCollection.bulletinBoard.PublicMethod.admin.updateBulletinBoard.url;
            let method = urlCollection.bulletinBoard.authMethod.admin.updateBulletinBoard.requestMethod;
            this.requestMethod(method,url,data,function (respData) {
                callerContext.$notify({
                    title: '修改成功',
                    message: '公告信息修改成功',
                    type: 'success'
                });
            });
        },
        deleteBulletin(callerContext,data) {
          let url = urlCollection.bulletinBoard.authMethod.admin.deleteBulletinBoard.url;
          let method = urlCollection.bulletinBoard.authMethod.admin.deleteBulletinBoard.requestMethod;
          this.requestMethod(method,url,data,function(respData){
              console.log(respData);
          });
        },
        login(callerContext,data) {
            let url = "http://localhost:8080/login";
            let method = "POST";
            this.requestMethod(method,url,data,function (respData) {
                //var respData = '{"code":0,"msg":"请求成功","data":{"id":1,"gmtCreate":1517123918000,"gmtModified":1517124379000,"isDeleted":0,"identifier":"Xiongcheng","type":1,"adminName":"熊诚","sex":0,"phoneNumber":"18266666","avatar":"/static/img/susu.jpg","remark":null,"email":"iamwinner@126.com","adminPassword":"******"}}';

                var respEntity = JSON.parse(respData);
                if(respEntity.code == "-2") {
                    callerContext.$notify.error({
                        title: '登录信息',
                        message: '登录失败，用户名或密码错误'
                    });
                    return;
                }
                if(respEntity.code == "0") {
                    callerContext.$notify({
                        title: '登录信息',
                        message: '登录成功',
                        type: 'success'
                    });
                    callerContext.$store.commit("setLoginStatus",true);
                    // callerContext.$store.state.islogin = true;
                    callerContext.loginDialogVisible = false;
                    if(callerContext.loginForm.userType == "用户"){
                        callerContext.$store.commit("setRole",false);
                        //callerContext.$store.state.isadmin = false;
                        // callerContext.$store.state.userInformation = respEntity.data;
                        callerContext.$store.commit("setUserInformation",respEntity.data);

                    }else {
                        // callerContext.$store.state.isadmin = true;
                        callerContext.$store.commit("setRole",true);
                        callerContext.$store.commit("setAdminInformation",respEntity.data);
                        // callerContext.$store.state.adminInformation = respEntity.data;
                    }
                }
            });
        },
        logout(callerContext,data) {
            //this.requestMethod("POST","http://localhost:8080/logout",null,function (data) {
            this.requestMethod("POST","http://localhost:8080/logout",null,function (data) {
                callerContext.$notify({
                    title: '登录信息',
                    message: '退出登录成功',
                    type: 'success'
                });
            })
        },
        registe(callerContext,data) {
            let url = urlCollection.userBasis.publicMethod.register.url;
            let method = urlCollection.userBasis.publicMethod.register.requestMethod;
            this.requestMethod(method,url,data,function(){
                callerContext.$notify({
                    title: '注册信息',
                    message: '注册成功，请重新登录',
                    type: 'success'
                });
            });
        },
        addNewVioInformation(callerContext,data) {
            let url = urlCollection.vioInfo.authMethod.admin.addVioInfo.url;
            let method = urlCollection.vioInfo.authMethod.admin.addVioInfo.requestMethod;
            this.requestMethod(method,url,data,function (data) {
                if(data.code == '0'){
                    callerContext.$notify({
                        title: '新增信息',
                        message: '新增违章信息成功',
                        type: 'success'
                    });
                }
            })
        },
        deleteVioInformation(callerContext,data) {
            let url = urlCollection.vioInfo.authMethod.admin.deleteVioInfo.url;
            let method = urlCollection.vioInfo.authMethod.admin.deleteVioInfo.requestMethod;
            this.requestMethod(method,url,data,function (respData) {
                if(data.code == '0'){
                    callerContext.$notify({
                        title: '删除信息',
                        message: '违章信息删除成功',
                        type: 'success'
                    });
                }else {
                    callerContext.$notify.error({
                        title: '删除信息',
                        message: '删除失败，请重新刷新页面'
                    });
                }
            })
        },
        modifyVioInformtion(callerContext,data) {
            let url = urlCollection.vioInfo.authMethod.admin.updateVioInfo.url;
            let method = urlCollection.vioInfo.authMethod.admin.updateVioInfo.requestMethod;
            this.requestMethod(method,url,data,function (respData) {
                if(respData.code == '0') {
                    callerContext.$notify({
                        title: '修改信息',
                        message: '违章信息修改成功',
                        type: 'success'
                    });
                }else {
                    callerContext.$notify.error({
                        title: '修改信息',
                        message: '修改失败'
                    });
                }
            });
        },
        modifyUserOrAdminInfor(callerContext,data,isAdmin) {
            let url = urlCollection.userBasis.authMethod.admin.updateInfo.url;
            let method = urlCollection.userBasis.authMethod.admin.updateInfo.requestMethod;
            let adminUrl = urlCollection.adminBasis.authMethod.admin.updateInfo.url;
            let adminMethod = urlCollection.adminBasis.authMethod.admin.updateInfo.requestMethod;
            this.requestMethod(isAdmin ? adminMethod:method,isAdmin ? adminUrl:url,JSON.stringify(data),function (respData) {
                callerContext.$store.commit(isAdmin ? "setAdminInformation" : "setUserInformation",data)
                if(respData.code == '0') {
                    callerContext.$notify({
                        title: '修改信息',
                        message: '个人信息修改成功',
                        type: 'success'
                    });
                }else {
                    callerContext.$notify.error({
                        title: '修改信息',
                        message: '修改失败'
                    });
                }
            })
        },
        getRecord(callerContext,pageNum,isadmin) {
            let adminUrl = urlCollection.loginLog.authMethod.admin.getAdminLog.url + "?page=" + pageNum;
            let userUrl = urlCollection.loginLog.authMethod.user.getUserLog.url + "?page=" + pageNum;
            let method = urlCollection.loginLog.authMethod.admin.getAdminLog.requestMethod;
            this.requestMethod(method,isadmin ? adminUrl : userUrl,null,function (respData) {
                if(respData.code == '0') {
                    callerContext.tableData = respData.data.pageInfo.list;
                    callerContext.totalData = respData.data.pageInfo.total;
                }else {
                    callerContext.$notify.error({
                        title: '加载信息',
                        message: '数据加载失败'
                    });
                }
            })
        },
        checkUsernameUnique(callerContext,username,callback){
            let url = urlCollection.userBasis.publicMethod.checkIdentifier.url;
            let method = urlCollection.userBasis.publicMethod.checkIdentifier.requestMethod;
            this.requestMethod(method,url + "/" + username,null,function (respData) {
                if(respData.data == false) {
                    callback(new Error('用户名已存在'));
                }else{
                    callback();
                }
            })
        },
        carRegister(callerContext,data){
            let url = urlCollection.userBasis.authMethod.user.carRegister.url + "?";
            let requestMethod = urlCollection.userBasis.authMethod.user.carRegister.requestMethod;
            this.requestMethod(requestMethod,url + data,null,function (respData) {
                if(respData.code == '0'){
                    callerContext.$notify({
                        title: '新增信息',
                        message: '车辆注册成功',
                        type: 'success'
                    });
                    // callerContext.$router.push("/");
                }else{
                    callerContext.$notify.error({
                        title: '新增信息',
                        message: '车辆注册失败： ' + respData.data
                    });
                }
            });

        }
    }
</script>
