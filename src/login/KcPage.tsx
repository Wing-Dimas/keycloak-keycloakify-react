import { Suspense, lazy, useMemo } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import LoginResetPassword from "./pages/LoginResetPassword";

const DefaultTemplate = lazy(() => import("keycloakify/login/Template"));
const DefaultUserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const Template = lazy(() => import("./Template"));
const Template2 = lazy(() => import("./Template2"));
const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    useCustomCss(kcContext);

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={
                                    kcContext.themeName === "keycloakify-government"
                                        ? Template2
                                        : Template
                                }
                                doUseDefaultCss={false}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                {...{
                                    kcContext,
                                    i18n,
                                    classes,
                                    UserProfileFormFields,
                                    doMakeUserConfirmPassword
                                }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={DefaultTemplate}
                                doUseDefaultCss={true}
                                UserProfileFormFields={DefaultUserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };

function useCustomCss(kcContext: KcContext) {
    useMemo(() => {
        switch (kcContext.themeName) {
            case "keycloakify-public":
                import("./main-1.css");
                break;
            case "keycloakify-government":
                import("./main-2.css");
                break;
            default:
                break;
        }
    }, [kcContext.themeName]);
}
