'use strict';

const FormSetting = {
  email: {
    required: true,
    editHint: "请输入一个有效的电子邮箱",
    errorHint: "请输入一个有效的电子邮箱",
    validation: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    label: "邮箱"
  },
  username: {
    required: true,
    editHint:"用户名由字母和下划线组成",
    errorHint:"请填入合法的用户名",
    validation: /^[\w\_]+$/,
    label: "用户名"
  },
  password: {
    required: true,
    editHint: "8-20位的数字、字母或符号",
    errorHint: "8-20位的数字、字母或符号",
    validation: /^([A-Z]|[a-z]|[0-9]|[`\-=[];,.\/~!@#\$\%\^\*()_+}{:?]){8,20}$/,
    type:"password",
    label: "密码"
  },
  password_confirm: {
    required: true,
    editHint: "请输入确认密码",
    errorHint: "与密码不同",
    label: "确认密码",
    type: "password",
  }
};

export default FormSetting;