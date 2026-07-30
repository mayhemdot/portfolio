import type { Payload, CollectionSlug, GlobalSlug } from 'payload'
import { createLocalReq } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import path from 'path'
import fs from 'fs'

export const seedData = {
  "collections": {
    "pages": [
      {
        "id": 2,
        "title": {
          "en-US": "Home",
          "ru-RU": "Главная"
        },
        "hero": {
          "type": "mainImpact",
          "subtitle": {
            "en-US": "WEB application",
            "ru-RU": "WEB приложений"
          },
          "items": [
            {
              "id": "6a6a66e5ead6f128f520847c",
              "value": {
                "en-US": null,
                "ru-RU": ""
              },
              "label": {
                "en-US": "Art Direction | Web Design | UX & UI",
                "ru-RU": "Art Direction | Web Design | UX & UI"
              },
              "description": {
                "en-US": null,
                "ru-RU": ""
              }
            },
            {
              "id": "6a6a6727ead6f128f520847e",
              "value": {
                "en-US": null,
                "ru-RU": ""
              },
              "label": {
                "en-US": "Frontend- and Backend-development",
                "ru-RU": "Frontend- и Backend-разработка"
              },
              "description": {
                "en-US": null,
                "ru-RU": null
              }
            },
            {
              "id": "6a6a6792ead6f128f5208480",
              "value": {
                "en-US": null,
                "ru-RU": null
              },
              "label": {
                "en-US": "Animation and Interaction",
                "ru-RU": "Анимация и взаимодействие | E-Commerce"
              },
              "description": {
                "en-US": null,
                "ru-RU": null
              }
            }
          ],
          "richText": {
            "en-US": {
              "root": {
                "children": [
                  {
                    "children": [
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "DIRECTION",
                        "type": "text",
                        "version": 1
                      },
                      {
                        "type": "linebreak",
                        "version": 1
                      },
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "DESIGN",
                        "type": "text",
                        "version": 1
                      },
                      {
                        "type": "linebreak",
                        "version": 1
                      },
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "DEVELOPMENT",
                        "type": "text",
                        "version": 1
                      }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "type": "heading",
                    "version": 1,
                    "tag": "h1"
                  }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "type": "root",
                "version": 1
              }
            },
            "ru-RU": {
              "root": {
                "children": [
                  {
                    "children": [
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "Проектирование",
                        "type": "text",
                        "version": 1
                      },
                      {
                        "type": "linebreak",
                        "version": 1
                      },
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "Дизайн",
                        "type": "text",
                        "version": 1
                      },
                      {
                        "type": "linebreak",
                        "version": 1
                      },
                      {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "Разработка",
                        "type": "text",
                        "version": 1
                      }
                    ],
                    "direction": null,
                    "format": "",
                    "indent": 0,
                    "type": "paragraph",
                    "version": 1,
                    "textFormat": 0,
                    "textStyle": ""
                  }
                ],
                "direction": null,
                "format": "",
                "indent": 0,
                "type": "root",
                "version": 1
              }
            }
          },
          "links": [
            {
              "id": "6a64ff98da1e9a203859faaa",
              "link": {
                "type": "reference",
                "newTab": null,
                "reference": {
                  "relationTo": "pages",
                  "value": 1
                },
                "url": {
                  "en-US": "/contact",
                  "ru-RU": "/telegram"
                },
                "label": {
                  "en-US": "Contact",
                  "ru-RU": "Contact"
                },
                "appearance": "default"
              }
            },
            {
              "id": "6a64ff98da1e9a203859faab",
              "link": {
                "type": "custom",
                "newTab": null,
                "url": {
                  "en-US": "/telegram",
                  "ru-RU": "/telegram"
                },
                "label": {
                  "en-US": "Telegram",
                  "ru-RU": "Telegram"
                },
                "appearance": "outline-solid"
              }
            }
          ],
          "media": 4
        },
        "layout": [
          {
            "id": "6a676868e9ebd4e31abe30ab",
            "media": 13,
            "blockName": null,
            "features": [],
            "skills": [
              {
                "id": "6a6877f122d87c114c935507",
                "category": "Frontend",
                "items": [
                  {
                    "id": "6a6877fd22d87c114c935509",
                    "name": "HTML"
                  },
                  {
                    "id": "6a68780922d87c114c93550b",
                    "name": " CSS/SCSS"
                  },
                  {
                    "id": "6a68780d22d87c114c93550d",
                    "name": "TYPESCRIPT"
                  },
                  {
                    "id": "6a68781a22d87c114c93550f",
                    "name": "REACT"
                  },
                  {
                    "id": "6a68781e22d87c114c935511",
                    "name": "NEXTJS"
                  },
                  {
                    "id": "6a68782922d87c114c935513",
                    "name": "TAILWIND"
                  }
                ]
              },
              {
                "id": "6a68783322d87c114c935515",
                "category": "Backend",
                "items": [
                  {
                    "id": "6a68783b22d87c114c935517",
                    "name": "Node.js"
                  },
                  {
                    "id": "6a68784722d87c114c935519",
                    "name": "Python"
                  },
                  {
                    "id": "6a68784b22d87c114c93551b",
                    "name": "PHP"
                  },
                  {
                    "id": "6a68785222d87c114c93551d",
                    "name": " Rust"
                  }
                ]
              },
              {
                "id": "6a68786422d87c114c935521",
                "category": "Databases",
                "items": [
                  {
                    "id": "6a6878b322d87c114c935523",
                    "name": "PostgreSQL"
                  },
                  {
                    "id": "6a6878bc22d87c114c935525",
                    "name": "MongoDB"
                  },
                  {
                    "id": "6a6878c222d87c114c935527",
                    "name": "MySQL"
                  },
                  {
                    "id": "6a6878c922d87c114c935529",
                    "name": "Redis"
                  }
                ]
              },
              {
                "id": "6a6878de22d87c114c93552b",
                "category": "CI&CD",
                "items": [
                  {
                    "id": "6a6878f022d87c114c93552d",
                    "name": "Docker"
                  },
                  {
                    "id": "6a6878f822d87c114c93552f",
                    "name": "GitHub"
                  },
                  {
                    "id": "6a6878ff22d87c114c935531",
                    "name": "Git "
                  },
                  {
                    "id": "6a68790422d87c114c935533",
                    "name": "Vercel "
                  }
                ]
              },
              {
                "id": "6a68791822d87c114c935535",
                "category": "3D & Animation",
                "items": [
                  {
                    "id": "6a68792122d87c114c935537",
                    "name": "GSAP"
                  },
                  {
                    "id": "6a68792f22d87c114c935539",
                    "name": "Three.js"
                  },
                  {
                    "id": "6a68793822d87c114c93553b",
                    "name": "WebGL"
                  },
                  {
                    "id": "6a68793f22d87c114c93553d",
                    "name": "Blender"
                  },
                  {
                    "id": "6a68794522d87c114c93553f",
                    "name": "Lenis"
                  }
                ]
              },
              {
                "id": "6a68796222d87c114c935541",
                "category": "Design",
                "items": [
                  {
                    "id": "6a68797122d87c114c935543",
                    "name": "Adobe Photoshop"
                  },
                  {
                    "id": "6a68797522d87c114c935545",
                    "name": "Adobe Illustrator"
                  },
                  {
                    "id": "6a68798222d87c114c935547",
                    "name": "Figma"
                  }
                ]
              }
            ],
            "skillsList": [],
            "blockType": "aboutUs",
            "title": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Hi, I’m Evgenii!",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h3"
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Привет, Я Евгений!",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            },
            "description": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "             With 8 years in web development and a background in construction finance, ",
                          "type": "text",
                          "version": 1
                        },
                        {
                          "type": "linebreak",
                          "version": 1
                        },
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "I bridge the gap between structural precision and creative engineering.",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Имея 8-летний опыт работы в сфере веб-разработки и финансирования строительства, я устраняю разрыв между структурной точностью и креативным подходом к проектированию.",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            },
            "skillsTitle": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "My skills. ",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h3"
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Компетенции",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h3"
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            },
            "skillsDescription": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "          From memory-level performance with Rust and WebGL to pixel-perfect motion and scalable web architecture.",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "         От управления памятью до визуального интерактива и масштабируемых систем",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            }
          },
          {
            "id": "6a65026089a96a0d2421edab",
            "populateBy": "collection",
            "relationTo": "projects",
            "limit": 10,
            "blockName": null,
            "blockType": "projects",
            "introContent": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Our projects",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Проекты",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            },
            "selectedDocs": []
          },
          {
            "id": "6a68edf0572a6c53da449d37",
            "blockName": null,
            "items": [
              {
                "id": "6a68edfa572a6c53da449d39",
                "badge": {
                  "en-US": "Full-Cycle Execution",
                  "ru-RU": "Полный циклы"
                },
                "title": {
                  "en-US": "Direct Ownership",
                  "ru-RU": "Прямое владение"
                },
                "description": {
                  "en-US": "Direct engineering from server logic to interactive UI. No middle management, no lost context, and zero friction between design and code. You work directly with the person building your product.",
                  "ru-RU": "Прямая разработка от серверной логики до интерактивного пользовательского интерфейса. Никакого посредничества, потери контекста и противоречий между дизайном и кодом. Вы работаете напрямую с человеком, который создает ваш продукт."
                }
              },
              {
                "id": "6a68ee22572a6c53da449d3b",
                "badge": {
                  "en-US": "Engineering Standard",
                  "ru-RU": "Инженерный стандарт"
                },
                "title": {
                  "en-US": "High-Performance System",
                  "ru-RU": "Высокопроизводительная система"
                },
                "description": {
                  "en-US": "Built for long-term scalability with instant page loads, streamlined CMS management, and clean architecture that makes future updates simple and cost-effective",
                  "ru-RU": "Создано для долгосрочной масштабируемости с мгновенной загрузкой страниц, оптимизированным управлением CMS и понятной архитектурой, которая делает будущие обновления простыми и экономичными."
                }
              },
              {
                "id": "6a68ee31572a6c53da449d3d",
                "badge": {
                  "en-US": "Delivery Commitment",
                  "ru-RU": "Обязательство по реализация"
                },
                "title": {
                  "en-US": "Predictable Output",
                  "ru-RU": "Предсказуемый результат"
                },
                "description": {
                  "en-US": "Fixed scope, clear milestones, and absolute accountability. The build isn't complete until it’s fully tested, optimized, and handed over as a flawless, production-ready system.",
                  "ru-RU": "Фиксированный объем работ, четкие этапы и абсолютная подотчетность. Сборка считается завершенной только после того, как она будет полностью протестирована, оптимизирована и передана в виде безупречной, готовой к запуску системы."
                }
              }
            ],
            "blockType": "approachBlock",
            "eyebrow": {
              "en-US": "METHODOLOGY",
              "ru-RU": "Методология"
            },
            "title": {
              "en-US": "Engineering High-End Digital Products",
              "ru-RU": "Разработка высокотехнологичных цифровых продуктов"
            },
            "subtitle": {
              "en-US": "How architecture, content management, and motion converge into a unified web experience.",
              "ru-RU": "Каким образом архитектура, управление контентом и анимация объединяются в единый веб-интерфейс."
            }
          },
          {
            "id": "6a699fc6bd95bf4fbecfaf61",
            "media": 11,
            "blockName": null,
            "blockType": "letsTalkSection",
            "title": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Let's Build Something Together",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h2"
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Реализуем ваш проект вместе",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h2"
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            },
            "subtitle": {
              "en-US": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Have an idea or a project in mind? Get in touch and let's turn it into reality.",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "center",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "У вас есть идея или проект? Свяжитесь с нами, и мы воплотим их в жизнь.",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": null,
                      "format": "center",
                      "indent": 0,
                      "type": "paragraph",
                      "version": 1,
                      "textFormat": 0,
                      "textStyle": ""
                    }
                  ],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            }
          }
        ],
        "meta": {
          "title": {
            "en-US": "Payload Website Template",
            "ru-RU": "Payload Website Template"
          },
          "image": {
            "en-US": 4,
            "ru-RU": 4
          },
          "description": {
            "en-US": "An open-source website built with Payload and Next.js.",
            "ru-RU": "An open-source website built with Payload and Next.js."
          }
        },
        "publishedAt": "2026-07-25T18:30:57.038Z",
        "generateSlug": false,
        "slug": "home",
        "_status": "draft"
      },
      {
        "id": 1,
        "title": {
          "en-US": "Contacts",
          "ru-RU": "Контакты"
        },
        "hero": {
          "type": "none",
          "subtitle": {
            "en-US": "by Gorunoff Evgenii",
            "ru-RU": "by Gorunoff Evgenii"
          },
          "items": [],
          "richText": {
            "en-US": null,
            "ru-RU": null
          },
          "links": [],
          "media": null
        },
        "layout": [
          {
            "id": "6a64ff98da1e9a203859fab7",
            "form": 1,
            "enableIntro": true,
            "blockName": null,
            "blockType": "formBlock",
            "introContent": {
              "en-US": {
                "root": {
                  "type": "root",
                  "children": [
                    {
                      "type": "heading",
                      "children": [
                        {
                          "type": "text",
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Example contact form:",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 0,
                      "tag": "h3",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "version": 1
                }
              },
              "ru-RU": {
                "root": {
                  "children": [
                    {
                      "children": [
                        {
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Отправь форму",
                          "type": "text",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 0,
                      "type": "heading",
                      "version": 1,
                      "tag": "h3"
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "type": "root",
                  "version": 1
                }
              }
            }
          }
        ],
        "meta": {
          "title": {
            "en-US": null,
            "ru-RU": null
          },
          "image": {
            "en-US": null,
            "ru-RU": null
          },
          "description": {
            "en-US": null,
            "ru-RU": null
          }
        },
        "publishedAt": "2026-07-29T22:45:51.674Z",
        "generateSlug": false,
        "slug": "contact",
        "_status": "draft"
      }
    ],
    "projects": [
      {
        "id": 4,
        "title": {
          "en-US": "ALL AI TOOLS"
        },
        "year": "2026",
        "gallery": [
          {
            "id": "6a698312d69310d17ddeaded",
            "mediaItem": 10
          }
        ]
      },
      {
        "id": 3,
        "title": {
          "en-US": "PROPSPERITY CANDLES"
        },
        "year": "2024",
        "gallery": [
          {
            "id": "6a69716cd69310d17ddeadeb",
            "mediaItem": 9
          }
        ]
      },
      {
        "id": 2,
        "title": {
          "en-US": "EDGE MASTERY"
        },
        "year": "2025",
        "gallery": [
          {
            "id": "6a69712cd69310d17ddeade9",
            "mediaItem": 8
          }
        ]
      },
      {
        "id": 1,
        "title": {
          "en-US": "LUMO HOME"
        },
        "year": "2025",
        "gallery": [
          {
            "id": "6a65028e89a96a0d2421edad",
            "mediaItem": 5
          }
        ]
      }
    ],
    "media": [
      {
        "id": 13,
        "alt": {
          "en-US": "My photo"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/me1%20(1)-2.webp",
        "thumbnailURL": "/api/media/file/me1%20(1)-2-300x321.webp",
        "filename": "me1 (1)-2.webp",
        "mimeType": "image/webp",
        "filesize": 19958,
        "width": 793,
        "height": 848,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/me1%20(1)-2-300x321.webp",
            "width": 300,
            "height": 321,
            "mimeType": "image/webp",
            "filesize": 4228,
            "filename": "me1 (1)-2-300x321.webp"
          },
          "square": {
            "url": "/api/media/file/me1%20(1)-2-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 8694,
            "filename": "me1 (1)-2-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/me1%20(1)-2-600x642.webp",
            "width": 600,
            "height": 642,
            "mimeType": "image/webp",
            "filesize": 12742,
            "filename": "me1 (1)-2-600x642.webp"
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": "/api/media/file/me1%20(1)-2-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 17202,
            "filename": "me1 (1)-2-1200x630.webp"
          }
        }
      },
      {
        "id": 12,
        "alt": {
          "en-US": "My photo"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": {
            "root": {
              "children": [
                {
                  "children": [],
                  "direction": null,
                  "format": "",
                  "indent": 0,
                  "type": "paragraph",
                  "version": 1,
                  "textFormat": 0,
                  "textStyle": ""
                }
              ],
              "direction": null,
              "format": "",
              "indent": 0,
              "type": "root",
              "version": 1
            }
          }
        },
        "url": "/api/media/file/me1%20(1)-1.webp",
        "thumbnailURL": "/api/media/file/me1%20(1)-1-300x321.webp",
        "filename": "me1 (1)-1.webp",
        "mimeType": "image/webp",
        "filesize": 19958,
        "width": 793,
        "height": 848,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/me1%20(1)-1-300x321.webp",
            "width": 300,
            "height": 321,
            "mimeType": "image/webp",
            "filesize": 4228,
            "filename": "me1 (1)-1-300x321.webp"
          },
          "square": {
            "url": "/api/media/file/me1%20(1)-1-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 8694,
            "filename": "me1 (1)-1-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/me1%20(1)-1-600x642.webp",
            "width": 600,
            "height": 642,
            "mimeType": "image/webp",
            "filesize": 12742,
            "filename": "me1 (1)-1-600x642.webp"
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": "/api/media/file/me1%20(1)-1-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 17202,
            "filename": "me1 (1)-1-1200x630.webp"
          }
        }
      },
      {
        "id": 11,
        "alt": {
          "en-US": "arch shine"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/arch-shine.png",
        "thumbnailURL": "/api/media/file/arch-shine-300x169.png",
        "filename": "arch-shine.png",
        "mimeType": "image/png",
        "filesize": 1874109,
        "width": 1920,
        "height": 1080,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/arch-shine-300x169.png",
            "width": 300,
            "height": 169,
            "mimeType": "image/png",
            "filesize": 49515,
            "filename": "arch-shine-300x169.png"
          },
          "square": {
            "url": "/api/media/file/arch-shine-500x500.png",
            "width": 500,
            "height": 500,
            "mimeType": "image/png",
            "filesize": 281519,
            "filename": "arch-shine-500x500.png"
          },
          "small": {
            "url": "/api/media/file/arch-shine-600x338.png",
            "width": 600,
            "height": 338,
            "mimeType": "image/png",
            "filesize": 197535,
            "filename": "arch-shine-600x338.png"
          },
          "medium": {
            "url": "/api/media/file/arch-shine-900x506.png",
            "width": 900,
            "height": 506,
            "mimeType": "image/png",
            "filesize": 459185,
            "filename": "arch-shine-900x506.png"
          },
          "large": {
            "url": "/api/media/file/arch-shine-1400x788.png",
            "width": 1400,
            "height": 788,
            "mimeType": "image/png",
            "filesize": 1231952,
            "filename": "arch-shine-1400x788.png"
          },
          "xlarge": {
            "url": "/api/media/file/arch-shine-1920x1080.png",
            "width": 1920,
            "height": 1080,
            "mimeType": "image/png",
            "filesize": 1944196,
            "filename": "arch-shine-1920x1080.png"
          },
          "og": {
            "url": "/api/media/file/arch-shine-1200x630.png",
            "width": 1200,
            "height": 630,
            "mimeType": "image/png",
            "filesize": 841655,
            "filename": "arch-shine-1200x630.png"
          }
        }
      },
      {
        "id": 10,
        "alt": {
          "en-US": "Фоторедактор"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/All%20AI%20Tools%20%E2%80%93%20%D0%A4%D0%BE%D1%82%D0%BE%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%20%D0%B8%20%D1%83%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%84%D0%BE%D1%82%D0%BE%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%B7%D0%B5%20%D0%98%D0%98%20-%20Google%20Chrome%202026-07-29%2007-29-26.mp4",
        "thumbnailURL": null,
        "filename": "All AI Tools – Фоторедактор и улучшение фото на базе ИИ - Google Chrome 2026-07-29 07-29-26.mp4",
        "mimeType": "video/mp4",
        "filesize": 15165683,
        "width": null,
        "height": null,
        "focalX": null,
        "focalY": null,
        "sizes": {
          "thumbnail": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "square": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "small": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          }
        }
      },
      {
        "id": 9,
        "alt": {
          "en-US": "Ароматическая свеча"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/Candles%20-%20Google%20Chrome%202025-10-10_cmp.mp4",
        "thumbnailURL": null,
        "filename": "Candles - Google Chrome 2025-10-10_cmp.mp4",
        "mimeType": "video/mp4",
        "filesize": 2682360,
        "width": null,
        "height": null,
        "focalX": null,
        "focalY": null,
        "sizes": {
          "thumbnail": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "square": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "small": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          }
        }
      },
      {
        "id": 8,
        "alt": {
          "en-US": "Сайт с ножами"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/Edge_Mastery_Premium_Knives_%26_Sharpening_Tools_Google_Chrome_2025_cm.mp4",
        "thumbnailURL": null,
        "filename": "Edge_Mastery_Premium_Knives_&_Sharpening_Tools_Google_Chrome_2025_cm.mp4",
        "mimeType": "video/mp4",
        "filesize": 2639731,
        "width": null,
        "height": null,
        "focalX": null,
        "focalY": null,
        "sizes": {
          "thumbnail": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "square": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "small": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          }
        }
      },
      {
        "id": 7,
        "alt": {
          "en-US": "My photo"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/me1%20(1).webp",
        "thumbnailURL": "/api/media/file/me1%20(1)-300x321.webp",
        "filename": "me1 (1).webp",
        "mimeType": "image/webp",
        "filesize": 19958,
        "width": 793,
        "height": 848,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/me1%20(1)-300x321.webp",
            "width": 300,
            "height": 321,
            "mimeType": "image/webp",
            "filesize": 4228,
            "filename": "me1 (1)-300x321.webp"
          },
          "square": {
            "url": "/api/media/file/me1%20(1)-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 8694,
            "filename": "me1 (1)-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/me1%20(1)-600x642.webp",
            "width": 600,
            "height": 642,
            "mimeType": "image/webp",
            "filesize": 12742,
            "filename": "me1 (1)-600x642.webp"
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": "/api/media/file/me1%20(1)-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 17202,
            "filename": "me1 (1)-1200x630.webp"
          }
        }
      },
      {
        "id": 6,
        "alt": {
          "en-US": "My photo"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/me1.webp",
        "thumbnailURL": "/api/media/file/me1-300x321.webp",
        "filename": "me1.webp",
        "mimeType": "image/webp",
        "filesize": 20332,
        "width": 793,
        "height": 848,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/me1-300x321.webp",
            "width": 300,
            "height": 321,
            "mimeType": "image/webp",
            "filesize": 4716,
            "filename": "me1-300x321.webp"
          },
          "square": {
            "url": "/api/media/file/me1-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 9214,
            "filename": "me1-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/me1-600x642.webp",
            "width": 600,
            "height": 642,
            "mimeType": "image/webp",
            "filesize": 13832,
            "filename": "me1-600x642.webp"
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": "/api/media/file/me1-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 17204,
            "filename": "me1-1200x630.webp"
          }
        }
      },
      {
        "id": 5,
        "alt": {},
        "blurDataURL": null,
        "caption": {},
        "url": "/api/media/file/LUMO%20HOME%20_%20Modern%20furniture_cm-1.mp4",
        "thumbnailURL": null,
        "filename": "LUMO HOME _ Modern furniture_cm-1.mp4",
        "mimeType": "video/mp4",
        "filesize": 3211502,
        "width": null,
        "height": null,
        "focalX": null,
        "focalY": null,
        "sizes": {
          "thumbnail": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "square": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "small": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "medium": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "large": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "xlarge": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          },
          "og": {
            "url": null,
            "width": null,
            "height": null,
            "mimeType": null,
            "filesize": null,
            "filename": null
          }
        }
      },
      {
        "id": 4,
        "alt": {
          "en-US": "Straight metallic shapes with a blue gradient"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": null
        },
        "url": "/api/media/file/image-hero1-5.webp",
        "thumbnailURL": "/api/media/file/image-hero1-5-300x169.webp",
        "filename": "image-hero1-5.webp",
        "mimeType": "image/webp",
        "filesize": 49432,
        "width": 3200,
        "height": 1800,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/image-hero1-5-300x169.webp",
            "width": 300,
            "height": 169,
            "mimeType": "image/webp",
            "filesize": 2544,
            "filename": "image-hero1-5-300x169.webp"
          },
          "square": {
            "url": "/api/media/file/image-hero1-5-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 4810,
            "filename": "image-hero1-5-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/image-hero1-5-600x338.webp",
            "width": 600,
            "height": 338,
            "mimeType": "image/webp",
            "filesize": 5750,
            "filename": "image-hero1-5-600x338.webp"
          },
          "medium": {
            "url": "/api/media/file/image-hero1-5-900x506.webp",
            "width": 900,
            "height": 506,
            "mimeType": "image/webp",
            "filesize": 9402,
            "filename": "image-hero1-5-900x506.webp"
          },
          "large": {
            "url": "/api/media/file/image-hero1-5-1400x788.webp",
            "width": 1400,
            "height": 788,
            "mimeType": "image/webp",
            "filesize": 16492,
            "filename": "image-hero1-5-1400x788.webp"
          },
          "xlarge": {
            "url": "/api/media/file/image-hero1-5-1920x1080.webp",
            "width": 1920,
            "height": 1080,
            "mimeType": "image/webp",
            "filesize": 24346,
            "filename": "image-hero1-5-1920x1080.webp"
          },
          "og": {
            "url": "/api/media/file/image-hero1-5-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 12846,
            "filename": "image-hero1-5-1200x630.webp"
          }
        }
      },
      {
        "id": 3,
        "alt": {
          "en-US": "Curving abstract shapes with an orange and blue gradient"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": {
            "root": {
              "type": "root",
              "children": [
                {
                  "type": "paragraph",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "Photo by ",
                      "version": 1
                    },
                    {
                      "type": "link",
                      "children": [
                        {
                          "type": "text",
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Andrew Kliatskyi",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "fields": {
                        "linkType": "custom",
                        "newTab": true,
                        "url": "https://unsplash.com/@kirp"
                      },
                      "format": "",
                      "indent": 0,
                      "version": 2
                    },
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": " on Unsplash.",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "textFormat": 0,
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "version": 1
            }
          }
        },
        "url": "/api/media/file/image-post3-5.webp",
        "thumbnailURL": "/api/media/file/image-post3-5-300x169.webp",
        "filename": "image-post3-5.webp",
        "mimeType": "image/webp",
        "filesize": 14662,
        "width": 1920,
        "height": 1080,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/image-post3-5-300x169.webp",
            "width": 300,
            "height": 169,
            "mimeType": "image/webp",
            "filesize": 1240,
            "filename": "image-post3-5-300x169.webp"
          },
          "square": {
            "url": "/api/media/file/image-post3-5-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 2732,
            "filename": "image-post3-5-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/image-post3-5-600x338.webp",
            "width": 600,
            "height": 338,
            "mimeType": "image/webp",
            "filesize": 3018,
            "filename": "image-post3-5-600x338.webp"
          },
          "medium": {
            "url": "/api/media/file/image-post3-5-900x506.webp",
            "width": 900,
            "height": 506,
            "mimeType": "image/webp",
            "filesize": 5010,
            "filename": "image-post3-5-900x506.webp"
          },
          "large": {
            "url": "/api/media/file/image-post3-5-1400x788.webp",
            "width": 1400,
            "height": 788,
            "mimeType": "image/webp",
            "filesize": 9070,
            "filename": "image-post3-5-1400x788.webp"
          },
          "xlarge": {
            "url": "/api/media/file/image-post3-5-1920x1080.webp",
            "width": 1920,
            "height": 1080,
            "mimeType": "image/webp",
            "filesize": 14662,
            "filename": "image-post3-5-1920x1080.webp"
          },
          "og": {
            "url": "/api/media/file/image-post3-5-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 6950,
            "filename": "image-post3-5-1200x630.webp"
          }
        }
      },
      {
        "id": 2,
        "alt": {
          "en-US": "Curving abstract shapes with an orange and blue gradient"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": {
            "root": {
              "type": "root",
              "children": [
                {
                  "type": "paragraph",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "Photo by ",
                      "version": 1
                    },
                    {
                      "type": "link",
                      "children": [
                        {
                          "type": "text",
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Andrew Kliatskyi",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "fields": {
                        "linkType": "custom",
                        "newTab": true,
                        "url": "https://unsplash.com/@kirp"
                      },
                      "format": "",
                      "indent": 0,
                      "version": 2
                    },
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": " on Unsplash.",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "textFormat": 0,
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "version": 1
            }
          }
        },
        "url": "/api/media/file/image-post2-5.webp",
        "thumbnailURL": "/api/media/file/image-post2-5-300x169.webp",
        "filename": "image-post2-5.webp",
        "mimeType": "image/webp",
        "filesize": 22332,
        "width": 1920,
        "height": 1080,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/image-post2-5-300x169.webp",
            "width": 300,
            "height": 169,
            "mimeType": "image/webp",
            "filesize": 2248,
            "filename": "image-post2-5-300x169.webp"
          },
          "square": {
            "url": "/api/media/file/image-post2-5-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 4952,
            "filename": "image-post2-5-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/image-post2-5-600x338.webp",
            "width": 600,
            "height": 338,
            "mimeType": "image/webp",
            "filesize": 5066,
            "filename": "image-post2-5-600x338.webp"
          },
          "medium": {
            "url": "/api/media/file/image-post2-5-900x506.webp",
            "width": 900,
            "height": 506,
            "mimeType": "image/webp",
            "filesize": 8036,
            "filename": "image-post2-5-900x506.webp"
          },
          "large": {
            "url": "/api/media/file/image-post2-5-1400x788.webp",
            "width": 1400,
            "height": 788,
            "mimeType": "image/webp",
            "filesize": 13880,
            "filename": "image-post2-5-1400x788.webp"
          },
          "xlarge": {
            "url": "/api/media/file/image-post2-5-1920x1080.webp",
            "width": 1920,
            "height": 1080,
            "mimeType": "image/webp",
            "filesize": 22332,
            "filename": "image-post2-5-1920x1080.webp"
          },
          "og": {
            "url": "/api/media/file/image-post2-5-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 11010,
            "filename": "image-post2-5-1200x630.webp"
          }
        }
      },
      {
        "id": 1,
        "alt": {
          "en-US": "Curving abstract shapes with an orange and blue gradient"
        },
        "blurDataURL": null,
        "caption": {
          "en-US": {
            "root": {
              "type": "root",
              "children": [
                {
                  "type": "paragraph",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "Photo by ",
                      "version": 1
                    },
                    {
                      "type": "link",
                      "children": [
                        {
                          "type": "text",
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Andrew Kliatskyi",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "fields": {
                        "linkType": "custom",
                        "newTab": true,
                        "url": "https://unsplash.com/@kirp"
                      },
                      "format": "",
                      "indent": 0,
                      "version": 2
                    },
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": " on Unsplash.",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "textFormat": 0,
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "version": 1
            }
          }
        },
        "url": "/api/media/file/image-post1-5.webp",
        "thumbnailURL": "/api/media/file/image-post1-5-300x169.webp",
        "filename": "image-post1-5.webp",
        "mimeType": "image/webp",
        "filesize": 15924,
        "width": 1920,
        "height": 1080,
        "focalX": 50,
        "focalY": 50,
        "sizes": {
          "thumbnail": {
            "url": "/api/media/file/image-post1-5-300x169.webp",
            "width": 300,
            "height": 169,
            "mimeType": "image/webp",
            "filesize": 1524,
            "filename": "image-post1-5-300x169.webp"
          },
          "square": {
            "url": "/api/media/file/image-post1-5-500x500.webp",
            "width": 500,
            "height": 500,
            "mimeType": "image/webp",
            "filesize": 3792,
            "filename": "image-post1-5-500x500.webp"
          },
          "small": {
            "url": "/api/media/file/image-post1-5-600x338.webp",
            "width": 600,
            "height": 338,
            "mimeType": "image/webp",
            "filesize": 3622,
            "filename": "image-post1-5-600x338.webp"
          },
          "medium": {
            "url": "/api/media/file/image-post1-5-900x506.webp",
            "width": 900,
            "height": 506,
            "mimeType": "image/webp",
            "filesize": 5936,
            "filename": "image-post1-5-900x506.webp"
          },
          "large": {
            "url": "/api/media/file/image-post1-5-1400x788.webp",
            "width": 1400,
            "height": 788,
            "mimeType": "image/webp",
            "filesize": 10210,
            "filename": "image-post1-5-1400x788.webp"
          },
          "xlarge": {
            "url": "/api/media/file/image-post1-5-1920x1080.webp",
            "width": 1920,
            "height": 1080,
            "mimeType": "image/webp",
            "filesize": 15924,
            "filename": "image-post1-5-1920x1080.webp"
          },
          "og": {
            "url": "/api/media/file/image-post1-5-1200x630.webp",
            "width": 1200,
            "height": 630,
            "mimeType": "image/webp",
            "filesize": 8114,
            "filename": "image-post1-5-1200x630.webp"
          }
        }
      }
    ],
    "categories": [
      {
        "id": 6,
        "title": {
          "en-US": "Engineering"
        },
        "generateSlug": false,
        "slug": "engineering",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 6,
              "url": "/engineering",
              "label": "Engineering",
              "id": "6a64ff90da1e9a203859fa73"
            }
          ]
        }
      },
      {
        "id": 5,
        "title": {
          "en-US": "Software"
        },
        "generateSlug": false,
        "slug": "software",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 5,
              "url": "/software",
              "label": "Software",
              "id": "6a64ff90da1e9a203859fa72"
            }
          ]
        }
      },
      {
        "id": 4,
        "title": {
          "en-US": "Design"
        },
        "generateSlug": false,
        "slug": "design",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 4,
              "url": "/design",
              "label": "Design",
              "id": "6a64ff90da1e9a203859fa71"
            }
          ]
        }
      },
      {
        "id": 3,
        "title": {
          "en-US": "Finance"
        },
        "generateSlug": false,
        "slug": "finance",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 3,
              "url": "/finance",
              "label": "Finance",
              "id": "6a64ff90da1e9a203859fa70"
            }
          ]
        }
      },
      {
        "id": 2,
        "title": {
          "en-US": "News"
        },
        "generateSlug": false,
        "slug": "news",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 2,
              "url": "/news",
              "label": "News",
              "id": "6a64ff90da1e9a203859fa6f"
            }
          ]
        }
      },
      {
        "id": 1,
        "title": {
          "en-US": "Technology"
        },
        "generateSlug": false,
        "slug": "technology",
        "parent": null,
        "breadcrumbs": {
          "en-US": [
            {
              "doc": 1,
              "url": "/technology",
              "label": "Technology",
              "id": "6a64ff90da1e9a203859fa6e"
            }
          ]
        }
      }
    ],
    "users": [
      {
        "id": 1,
        "name": "Admin User",
        "email": "admin@example.com",
        "sessions": [
          {
            "id": "ece57baf-2340-438d-b699-1ffb64026ee8",
            "createdAt": "2026-07-30T06:01:20.736Z",
            "expiresAt": "2026-07-30T08:01:20.736Z"
          }
        ]
      }
    ],
    "redirects": [],
    "forms": [
      {
        "id": 1,
        "title": "Contact Form",
        "fields": [
          {
            "id": "6a64ff98da1e9a203859faa5",
            "name": "full-name",
            "width": 100,
            "required": true,
            "blockName": "full-name",
            "blockType": "text",
            "label": {
              "en-US": "Full Name"
            },
            "defaultValue": {
              "en-US": null
            }
          },
          {
            "id": "6a64ff98da1e9a203859faa6",
            "name": "email",
            "width": 100,
            "required": true,
            "blockName": "email",
            "blockType": "email",
            "label": {
              "en-US": "Email"
            }
          },
          {
            "id": "6a64ff98da1e9a203859faa7",
            "name": "phone",
            "width": 100,
            "defaultValue": null,
            "required": false,
            "blockName": "phone",
            "blockType": "number",
            "label": {
              "en-US": "Phone"
            }
          },
          {
            "id": "6a64ff98da1e9a203859faa8",
            "name": "message",
            "width": 100,
            "required": true,
            "blockName": "message",
            "blockType": "textarea",
            "label": {
              "en-US": "Message"
            },
            "defaultValue": {
              "en-US": null
            }
          }
        ],
        "submitButtonLabel": {
          "en-US": "Submit"
        },
        "confirmationType": "message",
        "confirmationMessage": {
          "en-US": {
            "root": {
              "type": "root",
              "children": [
                {
                  "type": "heading",
                  "children": [
                    {
                      "type": "text",
                      "detail": 0,
                      "format": 0,
                      "mode": "normal",
                      "style": "",
                      "text": "The contact form has been submitted successfully.",
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "tag": "h2",
                  "version": 1
                }
              ],
              "direction": "ltr",
              "format": "",
              "indent": 0,
              "version": 1
            }
          }
        },
        "redirect": {
          "url": null
        },
        "emails": [
          {
            "id": "6a64ff98da1e9a203859faa9",
            "emailTo": "{{email}}",
            "cc": null,
            "bcc": null,
            "replyTo": null,
            "emailFrom": "\"Payload\" <demo@payloadcms.com>",
            "subject": {
              "en-US": "You've received a new message."
            },
            "message": {
              "en-US": {
                "root": {
                  "type": "root",
                  "children": [
                    {
                      "type": "paragraph",
                      "children": [
                        {
                          "type": "text",
                          "detail": 0,
                          "format": 0,
                          "mode": "normal",
                          "style": "",
                          "text": "Your contact form submission was successfully received.",
                          "version": 1
                        }
                      ],
                      "direction": "ltr",
                      "format": "",
                      "indent": 0,
                      "textFormat": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "format": "",
                  "indent": 0,
                  "version": 1
                }
              }
            }
          }
        ]
      }
    ],
    "form-submissions": [],
    "search": [
      {
        "id": 3,
        "title": {
          "en-US": "Dollar and Sense: The Financial Forecast"
        },
        "priority": 0,
        "slug": "dollar-and-sense-the-financial-forecast",
        "meta": {
          "title": "Dollar and Sense: The Financial Forecast",
          "description": "Money isn't just currency; it's a language. Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.",
          "image": 3
        },
        "categories": []
      },
      {
        "id": 2,
        "title": {
          "en-US": "Global Gaze: Beyond the Headlines"
        },
        "priority": 0,
        "slug": "global-gaze",
        "meta": {
          "title": "Global Gaze: Beyond the Headlines",
          "description": "Explore the untold and overlooked. A magnified view into the corners of the world, where every story deserves its spotlight.",
          "image": 2
        },
        "categories": []
      },
      {
        "id": 1,
        "title": {
          "en-US": "Digital Horizons: A Glimpse into Tomorrow"
        },
        "priority": 0,
        "slug": "digital-horizons",
        "meta": {
          "title": "Digital Horizons: A Glimpse into Tomorrow",
          "description": "Dive into the marvels of modern innovation, where the only constant is change. A journey where pixels and data converge to craft the future.",
          "image": 1
        },
        "categories": []
      }
    ],
    "payload-jobs": []
  },
  "globals": {
    "header": {
      "id": 1,
      "navItems": [
        {
          "id": "6a64ff99da1e9a203859fab8",
          "link": {
            "type": "custom",
            "newTab": null,
            "url": {
              "en-US": "/posts"
            },
            "label": {
              "en-US": "Posts"
            }
          }
        },
        {
          "id": "6a64ff99da1e9a203859fab9",
          "link": {
            "type": "reference",
            "newTab": null,
            "reference": {
              "relationTo": "pages",
              "value": 1
            },
            "url": {
              "en-US": null
            },
            "label": {
              "en-US": "Contact"
            }
          }
        }
      ],
      "globalType": "header"
    },
    "footer": {
      "id": 1,
      "navItems": [
        {
          "id": "6a64ff99da1e9a203859faba",
          "link": {
            "type": "custom",
            "newTab": null,
            "url": {
              "en-US": "/admin"
            },
            "label": {
              "en-US": "Admin"
            }
          }
        },
        {
          "id": "6a64ff99da1e9a203859fabb",
          "link": {
            "type": "custom",
            "newTab": true,
            "url": {
              "en-US": "https://github.com/payloadcms/payload/tree/main/templates/website"
            },
            "label": {
              "en-US": "Source Code"
            }
          }
        },
        {
          "id": "6a64ff99da1e9a203859fabc",
          "link": {
            "type": "custom",
            "newTab": true,
            "url": {
              "en-US": "https://payloadcms.com/"
            },
            "label": {
              "en-US": "Payload"
            }
          }
        }
      ],
      "globalType": "footer"
    }
  }
} as const

function extractLocaleData(data: any, targetLocale: string): any {
  if (data === null || data === undefined) return data
  if (Array.isArray(data)) {
    return data.map((item) => extractLocaleData(item, targetLocale))
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data)
    const isLocalizedMap =
      keys.length > 0 &&
      keys.every((k) => k === 'en-US' || k === 'ru-RU' || k === 'en' || k === 'ru')
    if (isLocalizedMap) {
      const val =
        data[targetLocale] !== undefined
          ? data[targetLocale]
          : data['en-US'] !== undefined
            ? data['en-US']
            : Object.values(data)[0]
      return extractLocaleData(val, targetLocale)
    }
    const result: Record<string, any> = {}
    for (const key of keys) {
      result[key] = extractLocaleData(data[key], targetLocale)
    }
    return result
  }
  return data
}

const EXCLUDED_COLLECTIONS = [
  'search',
  'payload-jobs',
  'payload-migrations',
  'payload-locked-documents',
  'payload-preferences',
]

const SEED_ORDER: string[] = [
  'users',
  'categories',
  'media',
  'forms',
  'form-submissions',
  'projects',
  'pages',
]

export async function seed(payload: Payload): Promise<void> {
  payload.logger.info('Starting seed process from generated seedData...')

  const localReq = await createLocalReq({ locale: 'en-US' }, payload)

  const collectionsInSeed = Object.keys(seedData.collections).filter(
    (c) => !EXCLUDED_COLLECTIONS.includes(c),
  )
  const collections = [
    ...SEED_ORDER.filter((c) => collectionsInSeed.includes(c)),
    ...collectionsInSeed.filter((c) => !SEED_ORDER.includes(c)),
  ] as CollectionSlug[]

  const globals = Object.keys(seedData.globals) as GlobalSlug[]

  // Truncate tables and reset identity sequences in PostgreSQL
  try {
    payload.logger.info('Truncating tables and resetting identity sequences in PostgreSQL...')
    if ((payload.db as any)?.drizzle?.execute) {
      await (payload.db as any).drizzle.execute(
        sql.raw(`TRUNCATE TABLE "users", "categories", "media", "forms", "form_submissions", "projects", "pages", "redirects", "search" RESTART IDENTITY CASCADE;`)
      )
    }
  } catch (err: any) {
    payload.logger.warn(`Could not truncate tables: ${err.message || err}`)
  }

  // Clear existing collection records in reverse dependency order
  for (const collection of [...collections].reverse()) {
    try {
      payload.logger.info(`Clearing ${collection}...`)
      await payload.db.deleteMany({ collection, where: {}, req: localReq as any })
    } catch (err: any) {
      payload.logger.warn(`Could not clear ${collection}: ${err.message || err}`)
    }
  }

  // Seed collection documents
  for (const collection of collections) {
    const rawItems = (seedData.collections as unknown as Record<string, readonly any[]>)[collection] || []
    const items = [...rawItems].sort((a, b) => (a.id && b.id ? a.id - b.id : 0))
    payload.logger.info(`Seeding ${items.length} records into ${collection}...`)
    for (const itemRaw of items) {
      const item = JSON.parse(JSON.stringify(itemRaw))
      try {
        if (collection === 'users') {
          item.password = item.password || process.env.ADMIN_PASSWORD || 'Password123!'
        }

        if (collection === 'categories') {
          delete item.breadcrumbs
        }

        if (collection === 'media') {
          try {
            const itemEn = extractLocaleData(item, 'en-US')
            if (typeof itemEn.url === 'string' && itemEn.url.includes('null')) {
              delete itemEn.url
            }

            const filename = itemEn.filename
            let fileBuffer: Buffer | null = null
            if (filename) {
              const candidates = [
                path.resolve(process.cwd(), 'public/media', filename),
                path.resolve(process.cwd(), 'src/payload/endpoints/seed', filename),
                path.resolve(process.cwd(), 'public', filename),
              ]
              for (const cand of candidates) {
                if (fs.existsSync(cand)) {
                  fileBuffer = fs.readFileSync(cand)
                  break
                }
              }
            }

            let fileObj: any = undefined
            if (fileBuffer && filename) {
              fileObj = {
                name: filename,
                data: fileBuffer,
                mimetype: itemEn.mimeType || 'image/webp',
                size: fileBuffer.byteLength,
              }
            } else {
              const fallbackBuffer = Buffer.from(
                'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/v38gAA=',
                'base64',
              )
              fileObj = {
                name: filename || 'placeholder.webp',
                data: fallbackBuffer,
                mimetype: itemEn.mimeType || 'image/webp',
                size: fallbackBuffer.byteLength,
              }
            }

            let createdMedia: any = null
            try {
              createdMedia = await payload.create({
                collection: 'media',
                data: itemEn as any,
                file: fileObj,
                locale: 'en-US',
                req: localReq,
                overrideAccess: true,
              })
            } catch (fileErr: any) {
              payload.logger.warn(`File upload skipped for ${itemEn.filename || itemEn.id}: ${fileErr.message || fileErr}. Creating DB record directly...`)
              createdMedia = await payload.create({
                collection: 'media',
                data: itemEn as any,
                locale: 'en-US',
                req: localReq,
                overrideAccess: true,
                context: { disableCloudStorage: true, skipCloudStorage: true },
              })
            }

            if (createdMedia && createdMedia.id) {
              const itemRu = extractLocaleData(item, 'ru-RU')
              if (typeof itemRu.url === 'string' && itemRu.url.includes('null')) {
                delete itemRu.url
              }
              await payload.update({
                collection: 'media',
                id: createdMedia.id,
                data: itemRu as any,
                locale: 'ru-RU',
                req: localReq,
                overrideAccess: true,
                context: { disableCloudStorage: true, skipCloudStorage: true },
              })
            }
          } catch (err: any) {
            payload.logger.warn(`Media creation skipped/failed for ${item.filename || item.id}: ${err.message || err}`)
          }
          continue
        }

        const dataEn = extractLocaleData(item, 'en-US')
        if (dataEn && typeof dataEn === 'object') {
          delete dataEn.breadcrumbs
        }
        const createdDoc = await payload.create({
          collection,
          data: dataEn as any,
          locale: 'en-US',
          req: localReq,
          overrideAccess: true,
        })

        const dataRu = extractLocaleData(item, 'ru-RU')
        if (dataRu && typeof dataRu === 'object') {
          delete dataRu.breadcrumbs
        }
        if (createdDoc && createdDoc.id) {
          await payload.update({
            collection,
            id: createdDoc.id,
            data: dataRu as any,
            locale: 'ru-RU',
            req: localReq,
            overrideAccess: true,
          })
        }
      } catch (err: any) {
        payload.logger.error(`Failed to create record in ${collection} (ID: ${item.id}): ${err.message || err}`)
      }
    }
  }

  // Seed globals
  for (const globalSlug of globals) {
    const data = JSON.parse(JSON.stringify((seedData.globals as unknown as Record<string, any>)[globalSlug] || {}))
    if (Object.keys(data).length > 0) {
      payload.logger.info(`Updating global ${globalSlug}...`)
      try {
        await payload.updateGlobal({
          slug: globalSlug,
          data: extractLocaleData(data, 'en-US') as any,
          locale: 'en-US',
          req: localReq,
          overrideAccess: true,
        })
        await payload.updateGlobal({
          slug: globalSlug,
          data: extractLocaleData(data, 'ru-RU') as any,
          locale: 'ru-RU',
          req: localReq,
          overrideAccess: true,
        })
      } catch (err: any) {
        payload.logger.error(`Failed to update global ${globalSlug}: ${err.message || err}`)
      }
    }
  }

  payload.logger.info('Database seeded successfully from generated seedData!')
}
