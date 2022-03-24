import Vue from "vue";
import VueRouter from "vue-router";
import EventDetail from "../views/member/EventDetail.vue";
import Events from "../views/member/Events.vue";
import Result from "../views/member/Result.vue";
import Login from "../views/Login.vue";
import Callback from "../views/Callback.vue";
import Candidatelist from "../views/member/CandidateList.vue";
import LayoutMember from "../views/LayoutMember.vue";
import Profile from "../views/member/Profile.vue";
import RegisterCan from "../views/member/RegisterCan.vue";
import VoteCandidate from "../views/member/VoteCandidate.vue";
import RegisVoter from "../views/member/RegisVoter.vue";
import EventTool from "../views/member/EventTool.vue";
import DecryptVotes from "../views/member/DecryptVotes.vue";


Vue.use(VueRouter);

const routes = [
  { 
    path: "/", name: "LayoutMember", component: LayoutMember, 
    children: [
      { path: "", name: "Events", component: Events, },
      { path: "/event-detail/:tbEventId", component: EventDetail, props: true,
        children: [
          { path: "", name: "EventTool", component: EventTool, props: true },
          { path: "/event-detail/:tbEventId/register", name: "RegisterCan", component: RegisterCan, props: true },
          { path: "/event-detail/:tbEventId/voting", name: "VoteCandidate", component: VoteCandidate, props: true },
          { path: "/event-detail/:tbEventId/candidate", name: "Candidatelist", component: Candidatelist, props: true },
          { path: "/event-detail/:tbEventId/result", name: "Result", component: Result, props: true, },
          { path: "/event-detail/:tbEventId/register-voter", name: "RegisVoter", component: RegisVoter, props: true, },
          { path: "/event-detail/:tbEventId/decrypt-votes", name: "DecryptVotes", component: DecryptVotes, props: true, },
        ]
      },
      { path: "/profile", name: "Profile", component: Profile },
    ]
  },
  { path: "/login", name: "Login", component: Login, },
  { path: "/callback", name: "Callback", component: Callback },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPage = ['/login', '/callback'];
  const authRequired = !publicPage.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');

  if(authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})



export default router;

// TODO:เกิดเมื่อเรียก route /event
// vue.runtime.esm.js:1896 TypeError: this.initialize is not a function