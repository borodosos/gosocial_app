import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import LoginPage from "@/pages/LoginPage.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vue from "vue";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import ToastService from "primevue/toastservice";
import Vuex from "vuex";

describe("Тест - LoginPage", () => {
  let router;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(VueRouter);
    Vue.use(ToastService);
    Vue.use(Vuex);
    router = new VueRouter({
      routes: [
        {
          path: "/registration",
          component: RegistrationPage,
        },
      ],
    });
  });

  test("LoginPage - экземпляр Vue", async () => {
    const component = mount(LoginPage, {
      store,
      vuetify,
      router,
    });
    expect(component.vm).toBeTruthy();
  });

  test("LoginPage - проверка ввода почты", async () => {
    const component = mount(LoginPage, {
      store,
      vuetify,
      router,
    });
    const emailInput = component.findComponent('[name="email"]');
    await emailInput.setValue("test@example.com");
    expect(emailInput.element.value).toBe("test@example.com");
    component.destroy();
  });

  test("LoginPage - валидация почты (успешно)", async () => {
    const component = mount(LoginPage, {
      store,
      vuetify,
      router,
    });

    const emailInput = component.findComponent('[name="email"]');

    await emailInput.setValue("test@example.com");
    expect(component.vm.emailRules()[0](emailInput.element.value)).toBeTruthy();
    expect(component.vm.emailRules()[1](emailInput.element.value)).toBeTruthy();
    component.destroy();
  });

  test("LoginPage - валидация почты (невалидная почта)", async () => {
    const component = mount(LoginPage, {
      store,
      vuetify,
      router,
    });

    const emailInput = component.findComponent('[name="email"]');

    await emailInput.setValue("test");
    expect(component.vm.emailRules()[0](emailInput.element.value)).toBeTruthy();
    expect(component.vm.emailRules()[1](emailInput.element.value)).toEqual(
      "E-mail must be valid"
    );
    component.destroy();
  });

  test("LoginPage - валидация почты (требуется почта)", async () => {
    const component = mount(LoginPage, {
      store,
      vuetify,
      router,
    });

    const emailInput = component.findComponent('[name="email"]');

    await emailInput.setValue("");
    expect(component.vm.emailRules()[0](emailInput.element.value)).toEqual(
      "E-mail is required"
    );
    expect(component.vm.emailRules()[1](emailInput.element.value)).toEqual(
      "E-mail must be valid"
    );
    component.destroy();
  });
});
