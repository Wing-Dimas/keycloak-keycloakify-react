import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";
import type { Attribute } from "keycloakify/login";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
    title: "login/register.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithEmailAlreadyExists: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            value: "12345677891237",
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        },
                        email: {
                            value: "jhon.doe@gmail.com"
                        },
                        firstName: {
                            value: "John"
                        },
                        lastName: {
                            value: "Doe"
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                },
                messagesPerField: {
                    // NOTE: The other functions of messagesPerField are derived from get() and
                    // existsError() so they are the only ones that need to mock.
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("email"),
                    get: (fieldName: string) => (fieldName === "email" ? "Email already exists." : undefined)
                }
            }}
        />
    )
};

export const WithRestrictedToMITStudents: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        },
                        email: {
                            validators: {
                                pattern: {
                                    pattern: "^[^@]+@([^.]+\\.)*((mit\\.edu)|(berkeley\\.edu))$",
                                    "error-message": "${profile.attributes.email.pattern.error}"
                                }
                            },
                            annotations: {
                                inputHelperTextBefore: "${profile.attributes.email.inputHelperTextBefore}"
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.email.inputHelperTextBefore": "Please use your MIT or Berkeley email.",
                        "profile.attributes.email.pattern.error":
                            "This is not an MIT (<strong>@mit.edu</strong>) nor a Berkeley (<strong>@berkeley.edu</strong>) email.",
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithFavoritePet: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        },
                        favoritePet: {
                            name: "favorite-pet",
                            displayName: "${profile.attributes.favoritePet}",
                            validators: {
                                options: {
                                    options: ["cat", "dog", "fish"]
                                }
                            },
                            annotations: {
                                inputOptionLabelsI18nPrefix: "profile.attributes.favoritePet.options"
                            },
                            required: false,
                            readOnly: false
                        } satisfies Attribute
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.favoritePet": "Favorite Pet",
                        "profile.attributes.favoritePet.options.cat": "Fluffy Cat",
                        "profile.attributes.favoritePet.options.dog": "Loyal Dog",
                        "profile.attributes.favoritePet.options.fish": "Peaceful Fish",
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithNewsletter: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        },
                        newsletter: {
                            name: "newsletter",
                            displayName: "Sign up to the newsletter",
                            validators: {
                                options: {
                                    options: ["yes"]
                                }
                            },
                            annotations: {
                                inputOptionLabels: {
                                    yes: "I want my email inbox filled with spam"
                                },
                                inputType: "multiselect-checkboxes"
                            },
                            required: false,
                            readOnly: false
                        } satisfies Attribute
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithEmailAsUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    registrationEmailAsUsername: true
                },
                profile: {
                    attributesByName: {
                        username: undefined
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithRecaptcha: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                },
                scripts: ["https://www.google.com/recaptcha/api.js?hl=en"],
                recaptchaRequired: true,
                recaptchaSiteKey: "6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa"
            }}
        />
    )
};

export const WithRecaptchaFrench: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                },
                locale: {
                    currentLanguageTag: "fr"
                },
                scripts: ["https://www.google.com/recaptcha/api.js?hl=fr"],
                recaptchaRequired: true,
                recaptchaSiteKey: "6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa"
            }}
        />
    )
};

export const WithPasswordMinLength8: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                passwordPolicies: {
                    length: 8
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};

export const WithTermsAcceptance: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                termsAcceptanceRequired: true,
                "x-keycloakify": {
                    messages: {
                        termsText: "<a href='https://example.com/terms'>Service Terms of Use</a>",
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};
export const WithTermsNotAccepted: Story = {
    render: args => (
        <KcPageStory
            {...args}
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                },
                termsAcceptanceRequired: true,
                messagesPerField: {
                    existsError: (fieldName: string) => fieldName === "termsAccepted",
                    get: (fieldName: string) => (fieldName === "termsAccepted" ? "You must accept the terms." : undefined)
                }
            }}
        />
    )
};
export const WithFieldErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            value: "",
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        },
                        email: { value: "invalid-email" }
                    }
                },
                messagesPerField: {
                    existsError: (fieldName: string) => ["username", "email"].includes(fieldName),
                    get: (fieldName: string) => {
                        if (fieldName === "username") return "Invalid NIK format";
                        if (fieldName === "email") return "Invalid email format.";
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};
export const WithReadOnlyFields: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: { value: "128312323080909", readOnly: true },
                        email: { value: "jhon.doe@gmail.com", readOnly: false }
                    }
                }
            }}
        />
    )
};
export const WithAutoGeneratedUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: {
                            value: "autogenerated_username",
                            validators: {
                                pattern: {
                                    pattern: "^\\d{2}\\d{2}\\d{2}(0[1-9]|[12]\\d|3[01])(0[1-9]|1[0-2])\\d{2}\\d{4}$",
                                    "error-message": "${profile.attributes.username.pattern.error}"
                                },
                                length: {
                                    min: 16,
                                    max: 16
                                }
                            }
                        }
                    }
                },
                "x-keycloakify": {
                    messages: {
                        "profile.attributes.username.pattern.error": "Invalid NIK format"
                    }
                }
            }}
        />
    )
};
