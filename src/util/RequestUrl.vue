<script>
    /**
     * 接口地址统一管理模块
     *
     * @Author XiongCheng
     * @version V1.0
     * @Date 2018-04-14 13:20.
     */
const urlPrefix = "http://localhost:8080";
// 管理员模块请求接口地址定义
const adminBasis = {
    //公共接口，不需要权限即可调用
    publicMethod:{
            // 校验用户名是否唯一
            checkIdentifier: {
                url: urlPrefix + "/Api/Public/Admin/checkIdentifier",
                requestMethod: "GET"
            },
            // 用户注册
            register: {
                url: urlPrefix + "/Api/Public/Admin/register",
                requestMethod: "POST"
            }
    },
    //需要权限才能调用
    authMethod: {
        admin: {
            // 修改密码
            changepwd:{
                url: urlPrefix + "/Api/Admin/changepwd",
                requestMethod: "PUT"
            },
            // 更新管理员信息
            updateInfo:{
                url: urlPrefix + "/Api/Admin/update",
                requestMethod: "PUT"
            }
        }
    }
};

//公告板模块接口定义
const bulletinBoard = {
    publicMethod:{
            // 获取公告，可带url参数
            getBulletinBoards: {
                url: urlPrefix + "/Api/Public/BulletinBoard",
                requestMethod: "GET"
            }
    },
    authMethod: {
        //需要admin权限才能调用
        admin: {
            //删除公告
            deleteBulletinBoard:{
                url: urlPrefix + "/Api/Admin/BulletinBoard",
                requestMethod: "DELETE"
            },
            //新增公告
            addBulletinBoard:{
                url: urlPrefix + "/Api/Admin/BulletinBoard",
                requestMethod: "POST"
            },
            //更新公告
            updateBulletinBoard:{
                url: urlPrefix + "/Api/Admin/BulletinBoard",
                requestMethod: "PUT"
            }
        }
    }
};
//咨询单模块接口定义
const consultationList = {
    publicMethod: {
        getConsultations:{
            url: urlPrefix + "/Api/Public/ConsultationList",
            requestMethod: "GET"
        }
    },
    authMethod: {
        admin: {
            //管理员回应咨询单
            respConsultation:{
                url: urlPrefix + "/Api/Admin/ConsultationList",
                requestMethod: "PUT"
            }

        },
        user: {
            addConsultation:{
                url: urlPrefix + "/Api/Admin/ConsultationList",
                requestMethod: "POST"
            },
            deleteConsultation:{
                url: urlPrefix + "/Api/Admin/ConsultationList",
                requestMethod: "DELETE"
            },
            updateConsultation:{
                url: urlPrefix + "/Api/Admin/ConsultationList",
                requestMethod: "PUT"
            }
        }
    }
}

//登录日志模块接口定义
const loginLog = {
    publicMethod: {},
    authMethod: {
        admin: {
            //获取管理员登录日志
            getAdminLog: {
                url: urlPrefix + "/Api/Admin/ListLoginLog",
                requestMethod: "GET"
            }
        },
        user: {
            //获取用户登录日志
            getUserLog: {
                url: urlPrefix + "/Api/User/ListLoginLog",
                requestMethod: "GET"
            }
        }
    }
}

//用户模块请求接口地址定义
const userBasis = {
    publicMethod:{
        // 校验用户名是否唯一
        checkIdentifier: {
            url: urlPrefix + "/Api/Public/User/checkIdentifier",
            requestMethod: "GET"
        },
        // 用户注册
        register: {
            url: urlPrefix + "/Api/Public/User/register",
            requestMethod: "POST"
        }
    },
    //需要权限才能调用
    authMethod: {
        user: {
            // 修改密码
            changepwd:{
                url: urlPrefix + "/Api/User/changepwd",
                requestMethod: "PUT"
            },
            // 更新用户信息
            updateInfo:{
                url: urlPrefix + "/Api/User/update",
                requestMethod: "PUT"
            },
            carRegister:{
                url: urlPrefix + "/Api/Public/User/carRegister",
                requestMethod: "POST"
            }
        }
    }
}

//违章信息模块请求接口地址定义
const vioInfo = {
    publicMethod:{
        // 查询违章信息
        getVioInfo: {
            url: urlPrefix + "/Api/Public/VioInformation",
            requestMethod: "GET"
        }
    },
    //需要权限才能调用
    authMethod: {
        admin: {
            // 获取所有违章信息
            getAllInfo:{
                url: urlPrefix + "/Api/Admin/VioInformation",
                requestMethod: "GET"
            },
            // 更新违章信息
            updateVioInfo:{
                url: urlPrefix + "/Api/Admin/VioInformation",
                requestMethod: "PUT"
            },
            // 添加违章信息
            addVioInfo:{
                url: urlPrefix + "/Api/Admin/VioInformation",
                requestMethod: "POST"
            },
            // 删除违章信息
            deleteVioInfo:{
                url: urlPrefix + "/Api/Admin/VioInformation",
                requestMethod: "DELETE"
            }
        }
    }
}

export default {
    urlPrefix,
    adminBasis,
    bulletinBoard,
    consultationList,
    loginLog,
    userBasis,
    vioInfo
}
</script>
