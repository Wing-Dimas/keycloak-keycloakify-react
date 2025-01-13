import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import * as FaIcons from "react-icons/fa";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container" className="mt-4">
                    <div id="kc-registration">
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                {msg("doRegister")}
                            </a>
                        </p>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <div className="flex items-center justify-center space-x-2 my-4">
                                <hr className="w-full border-gray-700" />
                                <span className="shrink-0">{msg("identity-provider-login-label")}</span>
                                <hr className="w-full border-gray-700" />
                            </div>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => {
                                    const iconName = ("Fa" +
                                        p.iconClasses
                                            ?.split("fa fa-")[1]
                                            .split("-")
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join("")) as keyof typeof FaIcons;

                                    const Icon = FaIcons[iconName] ?? FaIcons.FaUser;
                                    return (
                                        <li key={p.alias}>
                                            <a
                                                id={`social-${p.alias}`}
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 && "kcFormSocialAccountGridItem"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {p.iconClasses && <Icon />}
                                                <span
                                                    className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                    dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form" className="mt-4">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-4 md:space-y-6"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label>
                                    <input
                                        tabIndex={2}
                                        name="username"
                                        id="username"
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        defaultValue={login.username ?? ""}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        required
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <span
                                                id="input-error"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {msg("password")}
                                </label>

                                <div className="relative">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-primary-600 dark:text-neutral-600 dark:focus:text-primary-500"
                                    >
                                        <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path className={`${!showPassword && "hidden"}`} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path
                                                className={`${!showPassword && "hidden"}`}
                                                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                            ></path>
                                            <path
                                                className={`${!showPassword && "hidden"}`}
                                                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                            ></path>
                                            <line className={`${!showPassword ? "block" : "hidden"}`} x1="2" x2="22" y1="2" y2="22"></line>
                                            <path className={`block`} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle className={`${showPassword ? "hidden" : "block"}`} cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>

                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span
                                            id="input-error"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="rememberMe" className="text-gray-500 dark:text-gray-300 cursor-pointer">
                                                    {msg("rememberMe")}
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a
                                                tabIndex={6}
                                                href={url.loginResetCredentialsUrl}
                                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            >
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
