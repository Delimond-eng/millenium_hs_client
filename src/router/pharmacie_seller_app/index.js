import HomeSeller from "@/template/view/apps/pharmacie/home.vue";
import SellerPortal from "@/template/view/apps/pharmacie/pages/seller_portal.vue";
import SellerDashboard from "@/template/view/apps/pharmacie/pages/seller_dashboard.vue";

const routes = [{
    path: "/pharmacie/seller/home",
    component: HomeSeller,
    name: "seller-home-route",
    redirect: { name: "seller.portal" },
    children: [{
            path: "",
            component: SellerPortal,
            name: "seller.portal",
        },
        {
            path: "/pharmacie/seller/dashboard",
            component: SellerDashboard,
            name: "seller.dashboard",
        },
    ],
}, ];

export default routes;