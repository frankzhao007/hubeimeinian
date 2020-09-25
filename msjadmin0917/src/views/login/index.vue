<template>
  <div class="login_wrapper" ref="login_wrapper">
    <div class="login_wrapper_bg" ref="login_wrapper_bg">
      <!-- 中心背景图 -->
      <div class="login_bg">
        <img ref="img_bg" src="../../assets/img/loginBg.png" alt="">
      </div>
      <!-- 主体内容 -->
      <div class="login_wrapper_main" ref="login_wrapper_main">
        <div class="login_main">
          <div class="login_main_title">
            码上检
          </div>
          <!-- 登录 -->
          <div v-if="showForget1">
            <div class="login_main_tabs">
              <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                <!-- 短信登录-------------------------------------------------------------------------------------------------------------------- -->
                <el-tab-pane label="短信登录" name="first">
                  <div class="login_main_form">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                      <el-form-item prop="phone">
                        <div class="login_div">
                          <i class="icon_phone"></i>
                          <el-input class="login_input" @keyup.enter.native="submitPhoneForm('ruleForm')" v-model="ruleForm.phone" placeholder="手机号" style="width:100%;" maxlength="11"></el-input>
                        </div>
                      </el-form-item>
                      <el-form-item prop="code">
                        <div class="login_div">
                          <i class="icon_code"></i>
                          <div class="login_code" @click="getAuthCode('ruleForm')" v-if="sendAuthCode">获取验证码</div>
                          <div class="login_code1" v-else>（{{auth_time}}）</div>
                          <el-input class="login_input" @keyup.enter.native="submitPhoneForm('ruleForm')" v-model="ruleForm.code" placeholder="验证码"></el-input>
                        </div>
                      </el-form-item>
                      <div class="login_info">登录注册表示同意码上检<span @click="UseAgreement">《使用协议》</span><span @click="PrivacyPolicy">《隐私政策》</span></div>
                    </el-form>
                    <div class="login_button">
                      <el-button type="primary" :loading="LoginStatus" @click="submitPhoneForm('ruleForm')">登录</el-button>
                    </div>

                  </div>
                </el-tab-pane>
                <!-- 密码登入-------------------------------------------------------------------------------------------------------------------- -->
                <el-tab-pane label="密码登入" name="second">
                  <div class="login_main_form">
                    <el-form :model="secondForm" status-icon :rules="secondRules" ref="secondForm" class="demo-ruleForm">
                      <el-form-item prop="phone">
                        <div class="login_div">
                          <i class="icon_phone"></i>
                          <el-input class="login_input" @keyup.enter.native="submitSecondForm('secondForm')" v-model="secondForm.phone" placeholder="手机号" style="width:100%;" maxlength="11"></el-input>
                        </div>
                      </el-form-item>
                      <el-form-item prop="password">
                        <div class="login_div">
                          <i class="icon_newPass"></i>
                          <div class="login_code" @click="forgetPassword()">忘记密码</div>
                          <el-input class="login_input" @keyup.enter.native="submitSecondForm('secondForm')" type="password" v-model="secondForm.password" placeholder="密码" maxlength="20"></el-input>
                        </div>
                      </el-form-item>
                      <div class="login_info">登录注册表示同意码上检<span @click="UseAgreement">《使用协议》</span><span @click="PrivacyPolicy">《隐私政策》</span></div>
                    </el-form>
                    <div class="login_button">
                      <el-button type="primary" :loading="LoginStatus" @click="submitSecondForm('secondForm')">登录</el-button>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <!-- 忘记密码-------------------------------------------------------------------------------------------------------------------- -->
          <div v-if="showForget">
            <div class="login_main_tabs">
              <div class="login_forget_title"><i @click="forgetPassword1" class="el-icon-back"></i>&nbsp;&nbsp;忘记密码</div>
              <div class="login_main_form">
                <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" class="demo-ruleForm">
                  <el-form-item prop="phone">
                    <div class="login_div">
                      <i class="icon_phone"></i>
                      <el-input class="login_input" v-model="ruleForm1.phone" placeholder="手机号" style="width:100%;"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="newPass">
                    <div class="login_div">
                      <i class="icon_newPass"></i>
                      <el-input class="login_input" type="password" v-model="ruleForm1.newPass" placeholder="新密码" maxlength="20" style="width:100%;"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="code">
                    <div class="login_div">
                      <i class="icon_code"></i>
                      <div class="login_code" @click="getAuthCode('ruleForm1')" v-if="sendAuthCode">获取验证码</div>
                      <div class="login_code1" v-else>（{{auth_time}}）</div>
                      <el-input class="login_input" v-model="ruleForm1.code" placeholder="验证码"></el-input>
                    </div>
                  </el-form-item>
                </el-form>
                <div class="login_button">
                  <el-button type="primary" @click="forgetPassForm('ruleForm1')">确认修改</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isshowchangepassword">
            <div class="login_main_tabs">
              <div class="login_forget_title"><i @click="forgetPassword2" class="el-icon-back"></i>&nbsp;&nbsp;修改密码</div>
              <div>(为了您的账号安全，首次登录请修改密码后进入)</div>
              <div class="login_main_form">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                  <el-form-item prop="phone">
                    <div class="login_div">
                      <i class="icon_phone"></i>
                      <el-input class="login_input" disabled v-model="ruleForm2.phone" placeholder="手机号" style="width:100%;"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="newPass">
                    <div class="login_div">
                      <i class="icon_newPass"></i>
                      <el-input class="login_input" type="password" v-model="ruleForm2.newPass" placeholder="新密码" maxlength="20" style="width:100%;"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item prop="newPass1">
                    <div class="login_div">
                      <i class="icon_newPass"></i>
                      <el-input class="login_input" type="password" v-model="ruleForm2.newPass1" placeholder="确认密码" maxlength="20" style="width:100%;"></el-input>
                    </div>
                  </el-form-item>
                  <!-- <el-form-item prop="code">
                    <div class="login_div">
                      <i class="icon_code"></i>
                      <div class="login_code" @click="getAuthCode('ruleForm2')" v-if="sendAuthCode">获取验证码</div>
                      <div class="login_code1" v-else>（{{auth_time}}）</div>
                      <el-input class="login_input" v-model="ruleForm2.code" placeholder="验证码"></el-input>
                    </div>
                  </el-form-item> -->
                </el-form>
                <div class="login_button">
                  <el-button type="primary" @click="forgetPassForm('ruleForm2')">确认修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <div>
        <el-dialog title="《使用协议》" :visible.sync="UseAgreementDialog" width="1020px" center top="3vh">
          <div style="padding:0 30px;">
            您在使用武汉好卓大数据科技有限公司（以下简称“码上检”）及关联公司提供的各项服务之前，请您务必审慎阅读、充分理解本协议各条款内容，<br />
            特别是以粗体标注的部分，包括但不限于免除或者限制责任的条款。如您不同意本服务协议及/或随时对其的修改，您应立即停止注册；<br />
            您一旦使用码上检提供的服务，即视为您已了解并完全同意本服务协议各项内容，包括码上检对服务协议所做的修改，并成为我们的用户。<br />
            一、账号注册<br />
            1、您应当同意本协议的条款并按照页面上的提示完成全部的注册程序。您在进行注册程序或第三方授权登录程序过程中勾选协议即表示您与码上检达成协议，完全接受本协议项下的全部条款约束。<br />
            2、当您选择通过第三方授权登录程序进入码上检，您需授权码上检收集您的账号昵称及头像等标识化的个人信息，授权完成后，您即成为码上检的“用户”。<br />
            当您按照注册页面提示填写信息并注册成功后，您即成为码上检的“用户”；码上检将给予您一个用户帐号，密码由您自行设置。该用户帐号和密码由您自行负责保管。<br />
            您应当对您在码上检进行的活动和事件负法律责任。<br />
            3、本协议服务条款和公告可由码上检定时更新，并按照法定流程进行公示。您在使用相关服务时,应关注并遵守其所适用的相关条款。<br />
            4、使用同一身份认证信息、同一手机号或经码上检排查认定多个码上检账户的实际控制人为同一人的，均视为同一用户。<br />
            5、您确认，在您开始使用本服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，<br />
            则您需要在您监护人的陪同下完成注册，并且您与您的监护人应依照法律规定承担因此而导致的一切后果。<br />
            二、注册信息和隐私保护<br />
            1、您帐号的所有权归码上检，使用权归您。您按注册页面引导填写信息，阅读并同意本协议且完成全部注册程序后，即可获得注册账号并成为用户。您应提供及时、<br />
            详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。如果因注册信息不真实或<br />
            更新不及时而引发的相关问题，由您自行承担相应的责任。<br />
            2、您应当通过真实身份信息认证注册帐号，且您提交的帐号名称、头像、 简介等注册信息中不得出现违法和不良信息，经公司审核，如存在上述情况，<br />
            码上检将不予注册；同时，在注册后，如发现您以虚假信息骗取帐号名称注册，或其帐号头像、简介等注册信息存在违法和不良信息的，<br />
            码上检有权不经通知单方采取限期改正、暂停使用、注销登记、收回等措施。<br />
            3、您帐号包括帐户名称和密码，账户名称作为您有效的身份凭证之一。您可使用手机号和密码登录。<br />
            4、您不应将其帐号、密码转让、出售或出借予他人使用，若您授权他人使用帐户，应对被授权人在该帐户下发生所有行为负全部责任。由于您其他账户使用信息，<br />
            仅当依法律法规、司法裁定或经码上检同意，并符合码上检规定的用户帐号转让流程的情况下，方可进行帐号的转让。<br />
            5、因您个人原因导致的帐号信息遗失，如需找回帐号信息，请按照帐号找回要求提供相应的信息，并确保提供的信息合法真实有效，若提供的信息不符合要求，<br />
            无法通过安全验证，码上检有权拒绝提供帐号找回服务；若帐号的唯一凭证不再有效，码上检有权拒绝支持帐号找回。例如手机号二次出售，<br />
            码上检可拒绝支持帮助找回原手机号绑定的帐号。<br />
            6、在需要终止使用帐号服务时，符合以下条件的，您可以申请注销您的帐号：<br />
            （1）您仅能申请注销您本人的帐号，并依照码上检的流程进行注销；<br />
            （2）您仍应对您在注销帐号前且使用的行为承担相应责任，同时码上检仍可保存您注销前的相关信息；<br />
            （3）注销成功后，帐号信息、个人身份信息、交易记录、会员权益等将无法恢复或提供。<br />
            7、当您使用码上检产品进行支付、登录等操作的时候，服务器会自动接收、验证、并记录一些必要的信息，如手机号码、IP地址、服务访问异常信息、<br />
            以及部分设备信息等，以保障您在使用服务时账户登录和支付过程的安全，进而保护您的上网安全。您使用码上检的服务，<br />
            即表示您同意码上检可以按照《隐私政策》处理您的个人信息。码上检可能会与合作伙伴共同向您提供您所要求的服务或者共同向您展示您可能感兴趣的内容。<br />
            在信息为该项产品/服务所必须的情况下，您同意码上检可与其分享必要的信息。并且，码上检会要求其确保数据安全并且禁止用于任何其他用途。<br />
            除此之外，码上检不会向任何无关第三方提供或分享信息。<br />
            8、您知悉并授权，码上检仅在必需的情况下使用或与关联公司同步您的信息，以为您提供更好的服务。<br />
            9、为更好地向您提供服务，您同意码上检通过短信、app通知等形式向您发送相关商业性服务信息。<br />
            三、使用规则<br />
            1、您在使用码上检的服务时，必须遵守中华人民共和国相关法律法规的规定，您应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为:<br />
            （1）您设置的会员名或提供的信息不得含有下列内容之一的信息：<br />
            　　① 反对宪法所确定的基本原则的；<br />
            　　② 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
            　　③ 损害国家荣誉和利益的；<br />
            　　④ 煽动民族仇恨、民族歧视、破坏民族团结的；<br />
            　　⑤ 破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
            　　⑥ 散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
            　　⑦ 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
            　　⑧ 侮辱或者诽谤他人，侵害他人合法权利的；<br />
            　　⑨ 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；<br />
            　　⑩ 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；<br />
            （2）不得为任何非法目的而使用码上检服务系统；<br />
            （3）不利用码上检的服务从事以下活动：<br />
            　　① 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；<br />
            　　② 未经允许，对计算机信息网络功能进行删除、修改或者增加的；<br />
            　　③ 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；<br />
            　　④ 故意制作、传播计算机病毒等破坏性程序的；<br />
            　　⑤ 其他危害计算机信息网络安全的行为。<br />
            2、您违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿码上检与合作公司、<br />
            关联公司，并使之免受损害。对此，码上检有权视您的行为性质，采取包括但不限于删除您发布信息内容、暂停使用许可、终止服务、限制使用、回收帐号、<br />
            追究法律责任等措施。对恶意注册帐号或利用帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，码上检有权回收其帐号。<br />
            同时，码上检会视司法部门的要求，协助调查。<br />
            3、您需要对自己在服务使用过程中的行为负法律责任，即使您已经终止使用该服务。您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，<br />
            以及在码上检首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予码上检等额的赔偿。<br />
            4、码上检有权根据认定程序及标准判断您账户的使用可能危及您的账户安全及/或码上检平台信息安全的，码上检可拒绝提供相应服务或终止本协议。<br />
            四、服务内容<br />
            1、您在交易过程中与其他用户发生争议的，您或其他用户中任何一方可以自行协商解决，也可以通过码上检介入处理，<br />
            若您觉得以上的方式均无法达到您要的结果，您可以寻求司法机关的协助。<br />
            2、您选择码上检介入的方式处理相关问题，那么您需要遵守和执行码上检的处理结果。若您对码上检的处理结果不满意，<br />
            您可以寻求其他途径解决纠纷例如起诉、仲裁等方式，但在此之前您需先履行该结果。<br />
            3、码上检目前为您提供免费提供服务，但码上检保留因业务调整或者其他法律法规要求向您收取费用的权利。<br />
            4、码上检网络服务的具体内容由码上检根据实际情况提供。<br />
            5、鉴于网络服务的特殊性，您同意码上检有权不经事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。<br />
            码上检不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。<br />
            7、终止服务<br />
            您同意码上检得基于其自行之考虑，因任何理由，或码上检认为您已经违反本服务协议的文字及精神，终止您的密码、帐号或本服务之使用（或服务之任何部分），<br />
            并将您在本服务内任何内容加以移除并删除。您同意依本服务协议任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，<br />
            码上检可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意若本服务之使用被中断或终止或<br />
            您的帐号及相关信息和文件被关闭或删除，码上检对您或任何第三人均不承担任何责任。<br />
            五、个人数据保护与授权<br />
            1、为了保护您的财产及信息安全，预防诈骗或者其他网络犯罪行为，码上检有权收集您的个人信息，包括但不限于个人会员信息、<br />
            交易信息来判断您个人的交易风险，对您身份进行验证等。<br />
            2、根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：<br />
            ①、涉及公共安全，与重大利益相关的；<br />
            ②、与政府部门包括司法机关等相关的；<br />
            ③、出于保护您的个人财产或者利益的目的，但无法事先征求您同意的行为；<br />
            ④、您以自行对外公开的，包括但不限于通过报纸、新闻等方式公开；<br />
            ⑤、根据您的要求签订合同所必需的；<br />
            ⑥、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；<br />
            ⑦、国家法律法规政策认可或支持的相关行为；<br />
            3、我们已采取符合业界标准、合理可行的安全防护措施保护您提供的个人信息安全，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。<br />
            六、免责声明<br />
            因以下情况造成网络服务在合理时间内的中断，码上检无需为此承担任何责任；<br />
            （1）码上检需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，码上检保留不经事先通知为维修保养、<br />
            升级或其它目的暂停本服务任何部分的权利。<br />
            （2）因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；<br />
            （3）您的电脑软硬件和通信线路、供电线路出现故障的；<br />
            （4）因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行原因、第三方服务瑕疵或政府行为等原因。<br />
            尽管有前款约定，码上检将采取合理行动积极促使服务恢复正常。<br />
            七、知识产权和其他合法权益<br />
            1、码上检产品及相关网站上由码上检上传、制作、拥有的所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，<br />
            均由码上检或其关联公司依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。但如因您上传的由其自行制作、<br />
            拥有的内容涉及侵犯码上检或其他任何第三方的合法权益的，您应自行对其侵权行为产生的纠纷进行处理，并对其侵权行为承担法律责任，<br />
            且就由此给码上检造成的损失（包括但不限于码上检声誉的影响、码上检由此承担的连带责任（如有）等）进行赔偿。<br />
            2、非经码上检或其关联公司书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表在本网站上程序或内容<br />
            （仅限于由码上检上传、制作、拥有的所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计等）；<br />
            如您需使用著作权非码上检所有的内容的，您应获得具体内容的著作权所有者的合法授权才能使用，如因您私自使用非自己所有的、<br />
            且未经他人合法授权的著作、图片、档案、资讯、资料等内容的，由您自行承担责任，包括但不限于您自行对其侵权行为产生的纠纷进行处理，<br />
            并对其侵权行为承担法律责任，且就由此给乙方造成的损失（包括但不限于乙方声誉的影响、乙方由此承担的连带责任（如有）等）进行赔偿。<br />
            3、尊重知识产权是您应尽的义务，如有违反，您应承担损害赔偿责任。<br />
            八、其他<br />
            1、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，没有相关法律规定的，参照通用国际商业惯例和（或）行业惯例。<br />
            2、 如本协议的任何条款被视作无效或无法执行，则上述条款可被分离，其余条款则仍具有法律效力。<br />
            3、本协议任何一方于另一方过失或违约时放弃本协议规定的权利的，不得视为其对一方的其他或以后同类之过失或违约行为弃权。<br />
            4、码上检未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。<br />
            5、武汉好卓大数据科技有限公司和杭州好卓优医数据科技有限公司是同一实际控制人控制下的两家企业，故本合同项下部分权利义务由杭州好卓优医数据科技有限公司履行。<br />
            6、本协议最终解释权及修订权在法律范围内归码上检所有。<br />
            码上检（以下或称“我们”）将按法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。有鉴于此，我们制定本《隐私政策》（下称“本政策”）并提醒您：<br />
            本政策适用于码上检产品及服务，包括有码上检、码上检公众号、码上检小程序、码上检H5页面及客户端、码上检智能硬件以及将码上检部分功能/服务<br />
            作为第三方服务集成在有码上检公司（见定义条款）和/或其他第三方智能硬件、软件或服务中。如我们关联公司（范围详见定义部分）的产品或服务中使用了<br />
            码上检提供的产品或服务但未设独立的隐私政策的，则本政策同样适用于该部分产品或服务。<br />
            需要特别说明的是，本隐私政策不适用于其他第三方通过前述网页或客户端或者小程序或公众号等向您提供的服务。例如您通过码上检使用第三方应用（<br />
            如码上检插件市场）或者服务，或第三方服务和产品依托码上检产品向您提供服务时，您向第三方提供的信息不适用本政策。<br />
            在使用码上检产品或服务前，请您务必仔细阅读并透彻理解本政策，在确认充分理解并同意后使用相关产品或服务，如您对本隐私政策有任何疑问，<br />
            您可以通过我们公布的联系方式与我们联系。一旦您开始使用码上检产品或服务，即表示您已充分理解并同意本政策，即表示您已同意我们按照本隐私政策来收集、处理、存储、使用、共享和保护您的个人信息。
            第一部分 定义<br />
            码上检：是指研发并提供码上检产品和服务的武汉好卓大数据科技有限公司、杭州好卓优医数据科技有限公司，及现在或未来设立的相关关联公司的单称或合称。<br />
            个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。<br />
            个人敏感信息：包括身份证件号码、手机号码、个人生物识别信息、银行账号、财产信息、行踪轨迹、交易信息、14岁以下（含）儿童的个人信息等。<br />
            个人信息删除：指在实现日常业务功能所涉及的系统中去除个人信息的行为，使其保持不可被检索、访问的状态。<br />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="UseAgreementDialog = false">取 消</el-button>
            <el-button type="primary" @click="UseAgreementDialog = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="《隐私政策》" :visible.sync="PrivacyPolicyDialog" width="1020px" center top="3vh">
          <div style="padding:0 30px;">
            1、我们如何收集和使用您的个人信息；<br />
            2、我们如何使用 Cookie 和同类技术；<br />
            3、我们如何共享、转让、公开披露您的个人信息；<br />
            4、我们如何保护您的个人信息；<br />
            5、您如何行使您的个人信息权利；<br />
            6、我们如何处理儿童的个人信息；<br />
            7、您的个人信息如何在全球范围转移；<br />
            8、本政策如何更新；<br />
            9、如何联系我们。<br />
            一、我们如何收集和使用您的个人信息<br />
            我们会出于本政策所述的以下目的，收集和使用您的个人信息：<br />
            （一）提供账号服务<br />
            为了遵守法律法规的要求，以及向您提供更个性化、更便捷的服务，我们需要识别您的身份，当您注册我们的账户及您在使用我们的相关服务时，<br />
            需要您授权您的微信或微博等第三方账号的ID及头像和昵称，您需要填写、提交及/或以其他任何方式提供您的个人信息，<br />
            包括但不限于您的姓名、性别、出生年月日、身份证号码、电话号码、电子邮箱、收货地址及相关附加信息（<br />
            如您地址中的所在省份和城市、邮政编码等）、银行账户或其他支付工具的账户信息等。如果您仅需使用浏览、搜索等基本服务，<br />
            您不需要注册成为我们的账号及提供上述信息。如您不提供真实姓名、性别、出生年月日、身份证号码、电话号码、<br />
            电子邮箱也不影响您使用码上检的服务进行基本浏览、搜索、购买功能，但无法使用法律必须需要提供个人信息的高面额的储值卡、预付款、跨境电商等服务。<br />
            （二）为您展示或推送商品或服务<br />
            为给您提供更好的交易服务，我们会根据您的浏览及搜索记录、设备信息、位置信息、订单信息、及可能的个人身份信息，<br />
            提取您的浏览、搜索偏好、行为习惯、位置信息等特征，基于特征标签进行间接人群画像并展示、推送信息。<br />
            如您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订。<br />
            （三）向您提供商品或服务<br />
            1、您向我们提供的信息<br />
            为便于向您提供我们的产品或服务，我们会记录您提供的收货人姓名、收货地址、邮政编码、收货人联系电话。为完成交易，我们将搜集您的支付信息，以便我们了解您的支付状态。<br />
            您可以通过码上检为其他人订购商品或服务或要求其他人帮您付款，您需要提供该实际订购人的前述个人信息或提供代付人的支付信息或手机号码。<br />
            向码上检提供这些个人信息之前，您需确保您已经取得其授权同意。<br />
            2、我们在您使用服务过程中收集的信息<br />
            为向您提供更契合您需求的页面展示和搜索结果、了解产品适配性、识别账户异常状态，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：<br />
            设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本等软硬件特征和设备环境信息）、<br />
            设备所在位置相关信息（例如IP 地址、GPS位置以及能够提供相关信息的Wi-Fi 接入点、蓝牙和基站等传感器信息）。<br />
            日志信息：当您使用我们的网站或客户端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的IP地址、浏览器的类型、<br />
            电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。<br />
            请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，<br />
            则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理。<br />
            为展示您账户的订单信息，我们会收集您在使用我们服务过程中产生的订单信息用于向您展示及便于您对订单进行管理。<br />
            当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。<br />
            3、我们通过间接获得方式收集到的您的个人信息<br />
            为确认交易状态及为您提供售后与争议解决服务，我们会通过您基于交易所选择的交易对象、交易方式、支付机构、物流公司等收集与交易进度相关的您的交易、支付、物流信息，或将您的交易信息共享给上述服务提供者。
            您可通过我们提供的链接入口使用码上检账户登录我们关联公司或者合作公司提供的产品或服务，包括来自微信、微博、快手、小程序等的信息。<br />
            您在使用第三方服务时，可以直接使用第三方服务时直接跳转到我们提供服务的页面，如您进行了除浏览以外的行为，我们将可能收集到您的个人信息（包括您在第三账号的ID、头像、昵称等）。
            （四）为您提供安全保障<br />
            为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，我们可能使用或整合您的个人信息、交易信息、设备信息、有关网络日志以及我们关联公司、
            合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。<br />
            （五）其他用途<br />
            我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。<br />
            （六）征得授权同意的例外<br />
            根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：<br />
            1、根据法律法规的规定或行政、司法机构等有权机关的要求或者授权；<br />
            2、您出现违反适用法律、法规规定或者违反您与我们签署的相关协议（包括在线签署的电子协议）或相关规则时需要向第三方披露的情形。<br />
            3、我们与第三方进行联合营销活动，我们可能与其共享活动过程中产生的、为完成活动所必要的个人信息，如参加活动的用户数、中奖名单、中奖人联系方式等，以便第三方能及时向您发放奖品。<br />
            如与授权合作伙伴共享，仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如，在您使用我们配送服务时，<br />
            我们必须与物流服务提供商共享您的个人信息才能安排送货，或者安排合作伙伴提供服务。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途；
            4、为维护我们及关联方或其他我们用户的合法权益；
            5、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；<br />
            6、出于实现本政策公示的我们如何使用您的个人信息的目的，或为履行我们和您签订的协议中或本隐私政策中的义务和行使我们的权利，向我们的关联方、合作伙伴或代表我们履行某项职能的第三方（例如处理银行卡的支付机构等）分享您的个人信息。；
            7、法律法规规定的其他情形。
            如我们停止运营码上检产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。<br />
            二、我们如何使用 Cookie 和同类技术
            （一）Cookie的使用
            为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名Cookie、Flash Cookie或浏览器或关联应用程序提供的其他通常包含标识符、<br />
            站点名称以及一些号码和字符的本地存储（统称“Cookie”）。借助于 Cookie，网站能够存储您的偏好或购物车内的商品等数据。<br />
            如果您的浏览器或浏览器附加服务允许，您可修改对Cookie的接受程度或拒绝我们的Cookie。但如果您这么做，在某些情况下可能会影响您安全访问我们的网站，而无法使用部分我们提供的服务。<br />
            （二）网站信标和像素标签
            除Cookie 外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，<br />
            帮助我们了解您的产品或服务偏好以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。<br />
            三、我们如何共享、转让、公开披露您的个人信息<br />
            （一）共享
            我们不会与码上检服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：<br />
            1、在您主动选择情况下共享：若您主动通过码上检购买商品和服务，我们会根据您的选择，将您的订单信息与交易有关的必要信息与相关商品和服务的提供者共享来实现您向其购买商品或服务的需求，<br />
            并促使其可以完成后续的售后服务。您可以在相关商品和服务的提供者从事经营活动的主页面查询其营业执照登载的信息，以辨别您的交易对象身份。<br />
            2、在获取明确同意情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。例如，如果我们委托第三方向您提供产品或服务时，我们会在征得您同意后将上述信息共享给第三方，如果您拒绝提供此类信息，我们将无法完成相关交付服务。<br />
            3、在法定情形下共享：我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。<br />
            4、与关联公司共享：为便于我们基于码上检账户向您提供服务，推荐您可能感兴趣的信息或保护码上检关联公司或其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会与我们的关联公司共享。<br />
            我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束，如果我们共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意。<br />
            5、与授权合作伙伴共享：我们会委托授权合作伙伴为您提供某些服务或代表我们履行职能，我们仅会出于合法、正当、必要、特定、明确的目的共享您的信息，授权合作伙伴只能接触到为其履行职责所需信息，且不能将此信息用于任何其他目的。
            目前，我们的授权合作伙伴包括以下类型：<br />
            （1）使用我们SaaS软件的商家，使用我们的SaaS软件的商家为您商品或服务时，您提交的订单信息、支付信息、收货地址和联系人信息等，我们会使用我们SaaS软件的商家提供，以便于他们能完成您所需要的服务。如您不使用他们的服务，我们不会主动给任何一个商家提供您的任何个人信息。
            （2）广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或电子邮箱，通过这些信息可以联系到您或识别您的身份）与提供广告、分析服务的合作伙伴共享。
            （3）供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供技术基础设施服务、分析我们服务的使用方式、衡量服务的有效性、提供客户服务、支付便利或进行学术研究和调查。
            对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的数据保护协议，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。<br />
            （二）转让<br />
            我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：<br />
            1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息。<br />
            2、在码上检服务提供者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。
            （三）公开披露
            我们仅会在以下情况下，公开披露您的个人信息：<br />
            1、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；<br />
            2、如果我们确定您出现违反法律法规或严重违反码上检相关协议规则的情况，或为保护码上检及其关联公司用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或码上检相关协议规则征得您同意的情况下披露关于您的个人信息，
            包括相关违规行为以及码上检已对您采取的措施。例如，若您销售假货而严重违反码上检规则，我们可能会公开披露您的店铺主体信息与处罚情况。<br />
            （四）共享、转让、公开披露个人信息时事先征得授权同意的例外<br />
            以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：<br />
            1、根据法律法规的规定或行政、司法机构、国家部门等有权机关的要求依法提供的；<br />
            2、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；<br />
            3、您自行向社会公众公开的个人信息；<br />
            4、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。<br />
            根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。
            四、我们如何保护您的个人信息安全<br />
            （一）为保障您的信息安全，我们努力采取各种符合业界标准的物理、电子和管理方面的安全措施来保护您的个人信息，防止您的个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，
            保护您的个人信息。例如在您的浏览器与“服务”之间交换数据（如信用卡信息）时采用 SSL 加密保护技术；同时对网站本身提供 https 安全浏览方式；使用加密技术确保数据的保密性；使用受信赖的保护机制防止数据遭到恶意攻击；
            部署访问控制机制，确保只有授权人员才可访问个人信息；以及举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。<br />
            （二）我们的安全系统，有专门的团队在负责，公司从人力财力上均有较大的投入，且我们的系统安全性已通过权威第三方的监测，并获得了ISO27001等认证。<br />
            （三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。<br />
            （四）互联网并非绝对安全的环境，我们强烈建议您通过安全方式、使用复杂密码，协助我们保证您的账号安全。<br />
            （五）在不幸发生个人信息安全事件后，我们将按照法律法规的要求向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。<br />
            事件相关情况我们将以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。<br />
            同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。<br />
            五、您如何行使您的个人信息权利
            您对您的个人信息您享有以下权利：<br />
            （一）您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：<br />
            账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息或关闭您的账户等，您可以通过访问码上检网页执行此类操作。<br />
            搜索信息——您可以在码上检网及相关网站中访问或清除您的搜索历史记录、查看和修改兴趣以及管理其他数据。<br />
            如果您无法通过上述链接访问这些个人信息，您可以随时联系我们的客服。我们将在30天内回复您的访问请求。<br />
            （二）您有权更正您的个人信息；<br />
            （三）您有权删除您的个人信息，您可以登录码上检账号，点击您需要注销账号，再您确认删除您的账号信息时，我们将删除您的信息，由此产生的您的权益或者资产同时消失的损失由您承担；<br />
            （四）您有权改变您授权同意的范围。<br />
            以上信息您均可以通过码上检网站主页进行访问和更新。<br />
            如果您认为码上检存在违反法律的规定收集、使用您个人信息的情形，您可以通过码上检客服与我们取得联系。<br />
            六、您的个人信息如何在全球范围转移
            我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：<br />
            1、法律法规有明确规定；<br />
            2、获得您的明确授权；
            3、您通过互联网进行跨境交易等个人主动行为。<br />
            针对以上情形，我们会确保依据本隐私政策对您的个人信息提供足够的保护。<br />
            七、我们如何处理儿童的个人信息
            本政策所指的儿童是指不满14周岁的个人，如果没有父母或监护人的同意，儿童不得创建自己的用户账户。如您为未成年人的，建议您请您的父母或监护人仔细阅读本隐私政策，<br />
            并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、<br />
            父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。如果我们发现自己在未事先获得可证实的父母同意的情况下收集了儿童的个人信息，则会设法尽快删除相关数据。<br />
            八、本隐私政策如何更新<br />
            我们提供的服务和产品会不时更新和调整，隐私政策也将随之可能变更，如发生变更我们会以公示的方式进行通知到您，也不排除使用“弹框”或者邮件、短信等方式通知到您，请您及时查看最新的隐私政策。<br />
            九、如何联系我们<br />
            我们设立了个人信息保护部门，如对本政策内容有任何疑问、意见或建议，或发现您的个人信息可能被泄露，您可以发邮件与我们联系，我们将在15天内回复您的请求<br />
            如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过被告住所地有管辖权的法院提起诉讼来寻求解决方案。<br />

          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="PrivacyPolicyDialog = false">取 消</el-button>
            <el-button type="primary" @click="PrivacyPolicyDialog = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { resetRouter } from "@/router";
import Cookies from "js-cookie";
export default {
  name: "login",
  components: {},
  watch: {
    //监控浏览器高度变化
    winHeight(val) {
      this.winHeight = val;
      this.$refs.login_wrapper.style.height = this.winHeight + "px";
      // console.log(this.$refs.login_wrapper.style.height);
    },
    "ruleForm.phone": function(n, o) {
      this.ruleForm.phone = this.ruleForm.phone.replace(/[^\.\d]/g, "");
      this.ruleForm.phone = this.ruleForm.phone.replace(".", "");
    },
    "secondForm.phone": function(n, o) {
      this.secondForm.phone = this.secondForm.phone.replace(/[^\.\d]/g, "");
      this.secondForm.phone = this.secondForm.phone.replace(".", "");
      // callback(new Error("请输入手机号"));
    },
    activeName: function(n, o) {
      if (n == "first") {
        this.resetForm("ruleForm");
      } else {
        this.resetForm("secondForm");
      }
    },
    showForget: function(n, o) {
      if (n) {
        this.resetForm("ruleForm");
        // this.resetForm("secondForm");
      } else {
        this.resetForm("ruleForm1");
      }
    }
  },
  data() {
    var phoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var telStr = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        // var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (!telStr.test(value)) {
          callback(new Error("手机号码输入不规范"));
        } else {
          callback();
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        if (this.isVerificationCode == false) {
          callback(new Error("验证码不正确"));
        } else {
          callback();
        }
      }
    };
    var newPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
        return;
      }
      if (value.length < 8) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      if (value.length > 20) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      callback();
    };
    var newPass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
        return;
      }
      var str = /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/;
      if (!str.test(value)) {
        callback(new Error("密码必须包含数字和字母"));
      }
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error("不能输入中文"));
      }
      if (/^ +| +$/g.test(value)) {
        callback(new Error("不能输入空格"));
      }
      if (value.length < 8) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      if (value.length > 20) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      callback();
    };
    var newPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        return;
      }
      var str = /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/;
      if (!str.test(value)) {
        callback(new Error("密码必须包含数字和字母"));
        return;
      }
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error("不能输入中文"));
        return;
      }
      if (/^ +| +$/g.test(value)) {
        callback(new Error("不能输入空格"));
        return;
      }
      if (value.length < 8) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      if (value.length > 20) {
        callback(new Error("请输入8-20位字符"));
        return;
      }
      callback();
    };
    var password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var secondPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      isshowchangepassword: false,

      LoginStatus: false,
      // 弹窗
      UseAgreementDialog: false,
      PrivacyPolicyDialog: false,
      //验证码是否正确
      isVerificationCode: true,
      //忘记密码页面开关
      showForget: false,
      showForget1: true,
      //屏幕高度
      winHeight: window.innerHeight,
      //tab切换，默认为first
      activeName: "second",
      //验证码倒计时
      sendAuthCode: true, //布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’
      auth_time: 0, //倒计时 计数器

      //账号验证码登入数据
      ruleForm: { phone: "", code: "", newPass: "" },
      rules: {
        phone: [{ validator: phoneNumber, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        newPass: [{ validator: newPass, trigger: "blur" }]
      },
      ruleForm1: { phone: "", code: "", newPass: "" },
      rules1: {
        phone: [{ validator: phoneNumber, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        newPass: [{ validator: newPass2, trigger: "blur" }]
      },
      ruleForm2: { phone: "", newPass1: "", newPass: "" },
      rules2: {
        phone: [{ validator: phoneNumber, trigger: "blur" }],
        // code: [{ validator: validateCode, trigger: "blur" }],
        newPass: [{ validator: newPass1, trigger: "blur" }],
        newPass1: [{ validator: newPass1, trigger: "blur" }]
      },
      //账号密码登入数据
      // secondForm: { phone: "15327168996", password: "123456" },
      secondForm: { phone: "", password: "" },
      secondRules: {
        phone: [{ validator: phoneNumber, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {
    //挂载浏览器高度获取方法
    this.getwinHeight();
    // 回车登录
    // this.keydown();
    // 判断是否为登录状态
    this.isLogin();
  },
  methods: {
    isLogin() {
      if (Cookies.get("token")) {
        this.$router.push("/dashboard");
      } else {
        resetRouter(); //清除路由
        Cookies.remove("token"); //清除Cookies
      }
    },
    // 账号验证码登录
    loginPost() {
      var body = {
        mobile: this.ruleForm.phone,
        authCode: this.ruleForm.code
      };
      this.$api
        .post("/phoneLogin", body)
        .then(res => {
          // 执行某些操作
          console.log(res);
          this.LoginStatus = false;
          if (res != undefined) {
            this.LoginMessage();
            Cookies.set("token", res.data);
            this.$router.push("/dashboard");
          }
        })
        .catch(err => {
          console.log(err);
          this.LoginStatus = false;
        });
    },
    // 账号密码登录
    loginPassword() {
      var body = {
        mobile: this.secondForm.phone,
        password: this.secondForm.password
      };
      this.$api
        .post("/login", body)
        .then(res => {
          // 执行某些操作
          console.log(res);
          this.LoginStatus = false;
          if (res != undefined) {
            if (
              // false
              // this.secondForm.password == "a1234567890" ||
              this.secondForm.password == "a123456" ||
              this.secondForm.password == "00000000" ||
              this.secondForm.password == "123456"
            ) {
              this.ruleForm2.phone = this.secondForm.phone;
              this.ruleForm2.password = this.secondForm.password;
              this.isshowchangepassword = true;
              this.showForget = false;
              this.showForget1 = false;
              this.mytoken = res.data;
              // Cookies.set("token", res.data);
              return;
            }
            this.LoginMessage();
            Cookies.set("token", res.data);
            this.$router.push("/dashboard");
          }
        })
        .catch(err => {
          console.log(err);
          this.LoginStatus = false;
        });
    },
    LoginMessage() {
      var now = new Date();
      var hour = now.getHours();
      var titleMessage = "";
      if (hour < 6) {
        titleMessage = "凌晨好,";
      } else if (hour < 9) {
        titleMessage = "早上好,";
      } else if (hour < 12) {
        titleMessage = "上午好,";
      } else if (hour < 14) {
        titleMessage = "中午好,";
      } else if (hour < 17) {
        titleMessage = "下午好,";
      } else if (hour < 19) {
        titleMessage = "傍晚好,";
      } else if (hour < 22) {
        titleMessage = "晚上好,";
      } else {
        titleMessage = "晚上好,";
      }
      this.$notify({
        title: "欢迎",
        message: titleMessage + "欢迎回来！",
        type: "success",
        offset: 50
      });
    },
    // 修改密码
    RetrievePwd(formName) {
      if (formName == "ruleForm2") {
        var body = {
          Mobile: this[formName].phone,
          OldPassword: this[formName].password,
          Password: this[formName].newPass
        };
        this.$api
          .post("/UpdatePwd", body)
          .then(res => {
            // 执行某些操作
            console.log(res);
            // this.$message.success(res.msg);
            // this.showForget = false;
            // this.showForget1 = true;
            // this.activeName = "second";
            // this.secondForm.phone = body.mobile;
            // this[formName] = {
            //   phone: "",
            //   code: "",
            //   newPass: ""
            // };
            Cookies.set("token", this.mytoken);
            this.LoginMessage();
            this.$router.push("/dashboard");
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (formName == "ruleForm1") {
        console.log(this[formName]);
        var body = {
          mobile: this[formName].phone,
          password: this[formName].newPass,
          authCode: this[formName].code
        };
        this.$api
          .post("/RetrievePwd", body)
          .then(res => {
            // 执行某些操作
            console.log(res);
            this.$message.success(res.msg);
            this.showForget = false;
            this.showForget1 = true;
            this.activeName = "second";
            this.secondForm.phone = body.mobile;
            this[formName] = {
              phone: "",
              code: "",
              newPass: ""
            };
          })
          .catch(err => {
            console.log(err);
            // this.$message.error(err.msg);
          });
      }
    },
    // 账号验正码登录
    submitPhoneForm(formName) {
      console.log("验证码登录");
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.LoginStatus = true;
          this.loginPost();
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 账号密码登录
    submitSecondForm(formName) {
      console.log("密码登录");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.LoginStatus = true;
          this.loginPassword();
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改密码
    forgetPassForm(formName) {
      console.log("修改密码");
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(formName);
          console.log(this[formName]);
          if (formName == "ruleForm2") {
            if (this[formName].newPass != this[formName].newPass1) {
              this.$message.error("两次密码不一致！");
              return;
            }
          }

          this.RetrievePwd(formName);
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 请求验证码
    authCode(formName) {
      var body = {
        mobile: this[formName].phone
      };
      this.$api
        .post("/authCode", body)
        .then(res => {
          console.log(res.data);
          this.sendAuthCode = false;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    //获取验证码按钮
    getAuthCode(formName) {
      this.$refs[formName].validateField("phone");
      if (this[formName].phone != "") {
        var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (!telStr.test(this[formName].phone)) {
          console.log("手机号码输入不规范");
        } else {
          this.auth_time = 60;
          var auth_timetimer = setInterval(() => {
            this.auth_time--;
            if (this.auth_time <= 0) {
              this.sendAuthCode = true;
              clearInterval(auth_timetimer);
            }
          }, 1000);
          console.log("请求服务器");
          this.authCode(formName);
        }
      } else {
        console.log("this.ruleForm.code == ''");
      }
    },
    //忘记密码
    forgetPassword() {
      this.showForget = true;
      this.showForget1 = false;
      this.isshowchangepassword = false;
    },
    forgetPassword1() {
      this.showForget = false;
      this.showForget1 = true;
      this.isshowchangepassword = false;
    },
    forgetPassword2() {
      this.showForget = false;
      this.showForget1 = true;
      this.isshowchangepassword = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //tab切换方法
    handleClick(tab, event) {
      console.log(tab.name);
      // if (tab.name == "first") {

      // }
    },
    //获取浏览器高度获取方法
    getwinHeight() {
      const that = this;
      window.onresize = () => {
        return (() => {
          that.winHeight = window.innerHeight;
        })();
      };
      this.$refs.login_wrapper.style.height = this.winHeight + "px";
      // console.log(this.$refs.login_wrapper.style.height);
    },
    UseAgreement() {
      this.UseAgreementDialog = true;
      console.log("《使用协议》");
    },
    PrivacyPolicy() {
      this.PrivacyPolicyDialog = true;
      console.log("《隐私政策》");
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.login_wrapper {
  background: #bacaee;
  .login_wrapper_bg {
    width: 1080px;
    margin: 0 auto;
    height: 100%;
    min-height: 100%;
    position: relative;
    img {
      position: absolute;
      top: 20%;
      width: 1080px;
    }
    .login_wrapper_main {
      position: absolute;
      top: 20%;
      left: 40px;
      margin: 0 auto;
      width: 1000px;
      height: 600px;
      // opacity: 0.8;
      // background: #f4f4f4;
      // border: 1px solid #409eff;
      .login_main {
        // background: #909399;
        // border: 1px solid #409eff;
        width: 400px;
        height: 500px;
        padding-top: 80px;
        margin-left: 80px;
        .login_main_title {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #4e5583;
          text-align: left;
        }
        .login_main_tabs {
          width: 350px;
          padding-top: 30px;
          .el-icon-back {
            cursor: pointer;
          }
          .el-tabs__item {
            // padding: 0;
            padding-bottom: 10px;
            text-align: left;
            font-size: 18px !important;
            font-weight: 600 !important;
            color: #6f7695 !important;
          }
          .el-tabs__header {
            width: 270px;
          }
          .el-tabs__item.is-active {
            color: #5270c7 !important;
          }
          .el-tabs__item .is-top {
            color: #5270c7 !important;
          }
          .el-tabs__active-bar {
            height: 3px !important;
            max-width: 27% !important;
            background-color: #5270c7 !important;
          }
          .login_main_form {
            padding-top: 45px;
            width: 400px;
            .el-form-item {
              margin: 0 0 16px 0;
            }
            .login_div {
              position: relative;
              width: 350px;
              border-bottom: 1px solid #eeeeee;
              .icon_phone {
                position: absolute;
                left: 0;
                z-index: 5;
                background-image: url("../../assets/img/phone.png"); /*引入图片图片*/
                background-repeat: no-repeat; /*设置图片不重复*/
                background-position: 5px 9px; /*图片显示的位置*/
                width: 40px; /*设置图片显示的宽*/
                height: 40px; /*图片显示的高*/
              }
              .icon_code {
                position: absolute;
                left: 0;
                z-index: 5;
                background-image: url("../../assets/img/code.png"); /*引入图片图片*/
                background-repeat: no-repeat; /*设置图片不重复*/
                background-position: 5px 9px; /*图片显示的位置*/
                width: 40px; /*设置图片显示的宽*/
                height: 40px; /*图片显示的高*/
              }
              .icon_newPass {
                position: absolute;
                left: 0;
                z-index: 5;
                background-image: url("../../assets/img/password.png"); /*引入图片图片*/
                background-repeat: no-repeat; /*设置图片不重复*/
                background-position: 5px 9px; /*图片显示的位置*/
                width: 40px; /*设置图片显示的宽*/
                height: 40px; /*图片显示的高*/
              }
              .login_code {
                position: absolute;
                right: 15px;
                z-index: 5;
                width: 100px; /*设置图片显示的宽*/
                height: 40px; /*图片显示的高*/
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #5270c7;
                cursor: pointer;
              }
              .login_code1 {
                position: absolute;
                right: 30px;
                z-index: 5;
                width: 40px; /*设置图片显示的宽*/
                height: 40px; /*图片显示的高*/
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #5270c7;
              }
              .login_input {
                padding-left: 20px;
              }
              .el-input__inner {
                padding: 0;
                margin-left: 10px;
                border: none !important;
              }
            }

            .login_info {
              padding-top: 5px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #9ba0b5;
              span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #5270c7;
                cursor: pointer;
              }
            }
            .login_button {
              padding-top: 63px;
            }
            .el-button--primary {
              background: -webkit-linear-gradient(left, #5a79cf, #444ee2);
              border-radius: 0px;
              border: none;
              width: 240px;
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #ffffff;
              text-align: center;
            }
          }
        }
        .login_forget_title {
          line-height: 40px;
          padding: 0 0 15px 0;
          font-size: 18px;
          font-weight: 600;
          color: #6f7695;
        }
      }
    }
  }
}
</style>
