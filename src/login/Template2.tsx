import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

import logoMojokerto from "./assets/img/logo-mojokerto-2.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? "auth-page-custom"
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="max-w-md space-y-6 w-full">
            <div className="bg-opacity-[0.6] p-6 backdrop-blur-[8px] rounded-xl my-0 mx-4 bg-white space-y-6 border border-white">
                <div className="text-center">
                    <img
                        src={logoMojokerto}
                        alt="logo mojokerto"
                        className="h-[70px] m-auto"
                    />
                </div>
                <header className="space-y-4">
                    {(() => {
                        const node = !(
                            auth !== undefined &&
                            auth.showUsername &&
                            !auth.showResetCredentials
                        ) ? (
                            <>
                                <div className="font-medium text-center text-[1.2rem] leading-[1.4]">
                                    Single Sign On Layanan Pemerintahan
                                    <br />
                                    Kabupaten Mojokerto
                                </div>
                                <h1
                                    id="kc-page-title"
                                    className="text-[13px] font-medium mt-[1rem]"
                                >
                                    {!!headerNode && "Login menggunakan akun anda"}
                                </h1>
                            </>
                        ) : (
                            <div
                                id="kc-username"
                                className="flex justify-center items-center gap-2"
                            >
                                <label
                                    id="kc-attempted-username"
                                    className="inline-block"
                                >
                                    {auth.attemptedUsername}
                                </label>
                                <a
                                    id="reset-login"
                                    href={url.loginRestartFlowUrl}
                                    aria-label={msgStr("restartLoginTooltip")}
                                    className="inline-flex items-center"
                                >
                                    <div className="kc-login-tooltip">
                                        <svg
                                            className="w-6 h-6 text-primary-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                                            />
                                        </svg>

                                        <span className="sr-only">
                                            {msg("restartLoginTooltip")}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        );

                        if (displayRequiredFields) {
                            return (
                                <div
                                    className={clsx(
                                        kcClsx("kcContentWrapperClass"),
                                        "relative"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            kcClsx("kcLabelWrapperClass"),
                                            "subtitle",
                                            "absolute -top-5 right-0"
                                        )}
                                    >
                                        <span className="subtitle text-sm text-slate-400 font-normal">
                                            <span className="required text-red-500">
                                                *
                                            </span>
                                            {msg("requiredFields")}
                                        </span>
                                    </div>
                                    <div className="col-md-10">{node}</div>
                                </div>
                            );
                        }

                        return node;
                    })()}
                </header>
                <div id="" className="space-y-4">
                    {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                    {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <Alert type={message.type}>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </Alert>
                        )}
                    {children}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form
                            id="kc-select-try-another-way-form"
                            action={url.loginAction}
                            method="post"
                            className="m-0 space-y-4"
                        >
                            <div className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <a
                                    href="#"
                                    id="try-another-way"
                                    onClick={() => {
                                        document.forms[
                                            "kc-select-try-another-way-form" as never
                                        ].submit();
                                        return false;
                                    }}
                                >
                                    {msg("doTryAnotherWay")}
                                </a>
                            </div>
                        </form>
                    )}
                    {displayInfo && (
                        <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                            <div
                                id="kc-info-wrapper"
                                className={clsx(
                                    kcClsx("kcInfoAreaWrapperClass"),
                                    "text-sm text-center"
                                )}
                            >
                                {infoNode}
                            </div>
                        </div>
                    )}
                    {socialProvidersNode}
                </div>
            </div>
        </div>
    );
}

function Alert(props: {
    type: "success" | "warning" | "error" | "info";
    children: JSX.Element;
}) {
    let color;
    switch (props.type) {
        case "success":
            color = "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400";
            break;
        case "warning":
            color = "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400";
            break;
        case "error":
            color = "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400";
            break;
        case "info":
            color = "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-primary-400";
            break;
        default:
            break;
    }

    return (
        <div
            className={`flex items-center p-4 mb-4 text-sm rounded-lg mt-4 ${color}`}
            role="alert"
        >
            <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            {props.children}
        </div>
    );
}

// export default function Template(props: TemplateProps<KcContext, I18n>) {
//     const {
//         displayInfo = false,
//         displayMessage = true,
//         displayRequiredFields = false,
//         headerNode,
//         socialProvidersNode = null,
//         infoNode = null,
//         documentTitle,
//         bodyClassName,
//         kcContext,
//         i18n,
//         doUseDefaultCss,
//         classes,
//         children
//     } = props;

//     const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

//     const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

//     const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

//     useEffect(() => {
//         document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
//     }, []);

//     useSetClassName({
//         qualifiedName: "html",
//         className: kcClsx("kcHtmlClass")
//     });

//     useSetClassName({
//         qualifiedName: "body",
//         className: bodyClassName ?? kcClsx("kcBodyClass")
//     });

//     const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

//     if (!isReadyToRender) {
//         return null;
//     }

//     return (
//         <div className={kcClsx("kcLoginClass")}>
//             <div id="kc-header" className={kcClsx("kcHeaderClass")}>
//                 <div id="kc-header-wrapper" className="text-9xl">
//                     {msg("loginTitleHtml", realm.displayNameHtml)}
//                 </div>
//             </div>
//             <div className={kcClsx("kcFormCardClass")}>
//                 <header className={kcClsx("kcFormHeaderClass")}>
//                     {enabledLanguages.length > 1 && (
//                         <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
//                             <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
//                                 <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
//                                     <button
//                                         tabIndex={1}
//                                         id="kc-current-locale-link"
//                                         aria-label={msgStr("languages")}
//                                         aria-haspopup="true"
//                                         aria-expanded="false"
//                                         aria-controls="language-switch1"
//                                     >
//                                         {currentLanguage.label}
//                                     </button>
//                                     <ul
//                                         role="menu"
//                                         tabIndex={-1}
//                                         aria-labelledby="kc-current-locale-link"
//                                         aria-activedescendant=""
//                                         id="language-switch1"
//                                         className={kcClsx("kcLocaleListClass")}
//                                     >
//                                         {enabledLanguages.map(({ languageTag, label, href }, i) => (
//                                             <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
//                                                 <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
//                                                     {label}
//                                                 </a>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {(() => {
//                         const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
//                             <h1 id="kc-page-title">{headerNode}</h1>
//                         ) : (
//                             <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
//                                 <label id="kc-attempted-username">{auth.attemptedUsername}</label>
//                                 <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
//                                     <div className="kc-login-tooltip">
//                                         <i className={kcClsx("kcResetFlowIcon")}></i>
//                                         <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
//                                     </div>
//                                 </a>
//                             </div>
//                         );

//                         if (displayRequiredFields) {
//                             return (
//                                 <div className={kcClsx("kcContentWrapperClass")}>
//                                     <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
//                                         <span className="subtitle">
//                                             <span className="required">*</span>
//                                             {msg("requiredFields")}
//                                         </span>
//                                     </div>
//                                     <div className="col-md-10">{node}</div>
//                                 </div>
//                             );
//                         }

//                         return node;
//                     })()}
//                 </header>
//                 <div id="kc-content">
//                     <div id="kc-content-wrapper">
//                         {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
//                         {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
//                             <div
//                                 className={clsx(
//                                     `alert-${message.type}`,
//                                     kcClsx("kcAlertClass"),
//                                     `pf-m-${message?.type === "error" ? "danger" : message.type}`
//                                 )}
//                             >
//                                 <div className="pf-c-alert__icon">
//                                     {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
//                                     {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
//                                     {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
//                                     {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
//                                 </div>
//                                 <span
//                                     className={kcClsx("kcAlertTitleClass")}
//                                     dangerouslySetInnerHTML={{
//                                         __html: kcSanitize(message.summary)
//                                     }}
//                                 />
//                             </div>
//                         )}
//                         {children}
//                         {auth !== undefined && auth.showTryAnotherWayLink && (
//                             <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
//                                 <div className={kcClsx("kcFormGroupClass")}>
//                                     <input type="hidden" name="tryAnotherWay" value="on" />
//                                     <a
//                                         href="#"
//                                         id="try-another-way"
//                                         onClick={() => {
//                                             document.forms["kc-select-try-another-way-form" as never].submit();
//                                             return false;
//                                         }}
//                                     >
//                                         {msg("doTryAnotherWay")}
//                                     </a>
//                                 </div>
//                             </form>
//                         )}
//                         {socialProvidersNode}
//                         {displayInfo && (
//                             <div id="kc-info" className={kcClsx("kcSignUpClass")}>
//                                 <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
//                                     {infoNode}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
