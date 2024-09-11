window["packages/canyon-platform/src/pages/index.tsx"] = {"content":"import {\n  ArrowRightOutlined,\n  BarChartOutlined,\n  FolderOutlined,\n  LogoutOutlined,\n  SettingOutlined,\n} from \"@ant-design/icons\";\nimport { useQuery } from \"@apollo/client\";\nimport { useRequest } from \"ahooks\";\nimport axios from \"axios\";\nimport { useTranslation } from \"react-i18next\";\n\nimport book from \"../assets/book.svg\";\nimport {\n  CanyonLayoutBase,\n  CanyonModalGlobalSearch,\n} from \"../components/old-ui\";\nimport { MeDocument } from \"../helpers/backend/gen/graphql.ts\";\nimport { genBreadcrumbItems } from \"../layouts/genBreadcrumbItems.tsx\";\nimport { genTitle } from \"../layouts/genTitle.ts\";\nconst theme = localStorage.getItem(\"theme\") || \"light\";\n// console.log(theme, 'theme');\nfunction Index() {\n  const { t } = useTranslation();\n  useEffect(() => {\n    if (localStorage.getItem(\"token\") === null) {\n      localStorage.clear();\n      localStorage.setItem(\"callback\", window.location.href);\n      nav(\"/login\");\n    }\n  }, []);\n\n  const loc = useLocation();\n  const nav = useNavigate();\n\n  useEffect(() => {\n    if (loc.pathname === \"/\") {\n      nav(\"/projects\");\n    }\n    document.title = genTitle(loc.pathname);\n\n    try {\n      // @ts-ignore\n      if (meData?.me.username && meData?.me.username !== \"tzhangm\") {\n        // @ts-ignore\n        fetch(window.__canyon__.dsn, {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\",\n            Authorization: `Bearer ${localStorage.getItem(\"token\")}`,\n          },\n          body: JSON.stringify({\n            // @ts-ignore\n            coverage: window.__coverage__,\n            // @ts-ignore\n            commitSha: window.__canyon__.commitSha,\n            // @ts-ignore\n            projectID: window.__canyon__.projectID,\n            // @ts-ignore\n            instrumentCwd: window.__canyon__.instrumentCwd,\n            // @ts-ignore\n            reportID: `${meData?.me.username}|${loc.pathname}`,\n            // @ts-ignore\n            branch: window.__canyon__.branch,\n          }),\n        });\n      }\n    } catch (e) {\n      // console.log(e);\n    }\n  }, [loc.pathname]);\n\n  useEffect(() => {\n    setMenuSelectedKey(loc.pathname.replace(\"/\", \"\"));\n  }, [loc.pathname]);\n  const { data: meData } = useQuery(MeDocument);\n  useEffect(() => {\n    localStorage.setItem(\"username\", meData?.me.username || \"\");\n  }, [meData]);\n  const { data: baseData } = useRequest(\n    () => axios.get(\"/api/base\").then(({ data }) => data),\n    {\n      onSuccess(data) {\n        // @ts-ignore\n        window.GITLAB_URL = data.GITLAB_URL;\n      },\n    },\n  );\n  const [menuSelectedKey, setMenuSelectedKey] = useState<string>(\"projects\");\n  // @ts-ignore\n  window.canyonModalGlobalSearchRef = useRef(null);\n  return (\n    <>\n      {/*<GlobaScreenWidthLimitModal />*/}\n      <CanyonLayoutBase\n        breadcrumb={\n          <div>\n            {/*榜单mark*/}\n            <Breadcrumb\n              className={\"py-3\"}\n              items={genBreadcrumbItems(loc.pathname)}\n            />\n          </div>\n        }\n        itemsDropdown={[\n          {\n            label: (\n              <div className={\"text-red-500\"}>\n                <LogoutOutlined className={\"mr-2\"} />\n                Logout\n              </div>\n            ),\n            onClick: () => {\n              localStorage.clear();\n              window.location.href = \"/login\";\n            },\n          },\n        ]}\n        MeData={meData}\n        onClickGlobalSearch={() => {\n          // @ts-ignore\n          window.canyonModalGlobalSearchRef.current.report();\n        }}\n        title={\"Canyon\"}\n        logo={\n          <div>\n            <img src={`/${theme}-logo.svg?a=1`} alt=\"\" className={\"w-[28px]\"} />\n          </div>\n        }\n        mainTitleRightNode={\n          <div>\n            <Tooltip\n              title={\n                <div>\n                  <span>{t(\"menus.docs\")}</span>\n                  <ArrowRightOutlined />\n                </div>\n              }\n            >\n              <a\n                href={baseData?.SYSTEM_QUESTION_LINK}\n                target={\"_blank\"}\n                rel=\"noreferrer\"\n                className={\"ml-2\"}\n              >\n                {/* eslint-disable-next-line jsx-a11y/alt-text */}\n                <img src={book} />\n              </a>\n            </Tooltip>\n            {/*marker position*/}\n          </div>\n        }\n        menuSelectedKey={menuSelectedKey}\n        onSelectMenu={(selectInfo) => {\n          setMenuSelectedKey(selectInfo.key);\n          nav(`/${selectInfo.key}`);\n        }}\n        menuItems={[\n          {\n            label: t(\"menus.projects\"),\n            key: \"projects\",\n            icon: <FolderOutlined />,\n          },\n          {\n            label: t(\"报表\"),\n            key: \"reports\",\n            icon: <BarChartOutlined />,\n          },\n          {\n            label: t(\"menus.settings\"),\n            key: \"settings\",\n            icon: <SettingOutlined />,\n          },\n        ]}\n        renderMainContent={<Outlet />}\n        search={false}\n        account={false}\n      />\n      {/*// @ts-ignore*/}\n      <CanyonModalGlobalSearch ref={canyonModalGlobalSearchRef} />\n    </>\n  );\n}\n\nexport default Index;\n","coverage":{"name":"zt"}}