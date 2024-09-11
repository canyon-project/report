window["packages/canyon-platform/src/pages/index/projects/[id]/configure/index.tsx"] = {"content":"import Icon, { AppstoreOutlined, ExperimentOutlined } from \"@ant-design/icons\";\nimport { useMutation, useQuery } from \"@apollo/client\";\nimport { Editor } from \"@monaco-editor/react\";\nimport { FormRegion, TextTypography } from \"../../../../../components/ui\";\n\nimport {\n  GetProjectByIdDocument,\n  UpdateProjectDocument,\n} from \"../../../../../helpers/backend/gen/graphql.ts\";\nimport BasicForms from \"./helper/BasicForms.tsx\";\nimport { SolarUserIdLinear } from \"./helper/icons/SolarUserIdLinear.tsx\";\nimport MemberTable from \"./helper/MemberTable.tsx\";\nimport TagTable from \"./helper/TagTable.tsx\";\nconst gridStyle: any = {\n  width: \"100%\",\n};\nconst { Text } = Typography;\nconst { useToken } = theme;\nconst ProjectConfigure = () => {\n  const prm: any = useParams();\n  const { token } = useToken();\n  const { t } = useTranslation();\n  const { data: GetProjectByIdDocumentData } = useQuery(\n    GetProjectByIdDocument,\n    {\n      variables: {\n        projectID: prm.id,\n      },\n      fetchPolicy: \"no-cache\",\n    },\n  );\n  const [updateProject] = useMutation(UpdateProjectDocument);\n  const showMessage = () => {\n    message.success(\"保存成功\");\n  };\n  const [coverage, setCoverage] = useState<string>(\"\");\n\n  const [defaultBranch, setDefaultBranch] = useState<string>(\"\");\n\n  const basicFormsRef = useRef<any>(null);\n  return (\n    <div>\n      <TextTypography\n        title={t(\"projects.config.title\")}\n        icon={<AppstoreOutlined />}\n      />\n      <FormRegion\n        title={t(\"projects.config.basic.information\")}\n        icon={<Icon component={SolarUserIdLinear} />}\n        onSave={() => {\n          basicFormsRef.current?.submit();\n        }}\n      >\n        <BasicForms\n          ref={basicFormsRef}\n          data={GetProjectByIdDocumentData?.getProjectByID}\n        />\n      </FormRegion>\n      <div className={\"h-5\"}></div>\n      <MemberTable\n        members={GetProjectByIdDocumentData?.getProjectByID.members}\n      />\n      <div className={\"h-5\"}></div>\n      <TagTable tags={GetProjectByIdDocumentData?.getProjectByID.tags} />\n      <div className={\"h-5\"}></div>\n      <Card\n        title={\n          <div className={\"flex items-center\"}>\n            <ExperimentOutlined className={\"text-[#687076] mr-2 text-[16px]\"} />\n            <span>{t(\"projects.config.coverage\")}</span>\n          </div>\n        }\n      >\n        <Card.Grid hoverable={false} style={gridStyle}>\n          <div className={\"mb-5\"}>\n            <div className={\"mb-2\"}>\n              <div>{t(\"projects.default.branch\")}</div>\n              <Text className={\"text-xs\"} type={\"secondary\"}>\n                {t(\"projects.config.default.branch.desc\")}\n              </Text>\n            </div>\n            {GetProjectByIdDocumentData && (\n              <Select\n                defaultValue={\n                  GetProjectByIdDocumentData?.getProjectByID.defaultBranch\n                }\n                placeholder={\"请选择默认分支\"}\n                className={\"w-[240px]\"}\n                showSearch={true}\n                options={(\n                  GetProjectByIdDocumentData?.getProjectByID.branchOptions || []\n                ).map((item) => ({\n                  label: item,\n                  value: item,\n                }))}\n                onSelect={(value) => {\n                  setDefaultBranch(value as string);\n                }}\n              />\n            )}\n          </div>\n\n          <div className={\"mb-5\"}>\n            <div className={\"mb-2\"}>\n              <div>{t(\"projects.config.detection.range\")}</div>\n              <Text className={\"text-xs\"} type={\"secondary\"}>\n                {t(\"projects.config.tooltips\")}\n                <a\n                  href=\"https://github.com/isaacs/minimatch\"\n                  target={\"_blank\"}\n                  rel=\"noreferrer\"\n                >\n                  {t(\"projects.config.minimatch\")}\n                </a>\n                <a\n                  href=\"https://github.com/canyon-project/canyon/tree/main/examples/config/coverage.json\"\n                  target={\"_blank\"}\n                  rel=\"noreferrer\"\n                >\n                  {t(\"projects.config.view.example\")}\n                </a>\n                <span className={\"ml-2\"}>{t(\"projects.config.example2\")}</span>\n              </Text>\n            </div>\n            <div style={{ border: \"1px solid \" + token.colorBorder }}>\n              {GetProjectByIdDocumentData?.getProjectByID && (\n                <Editor\n                  theme={\n                    {\n                      light: \"light\",\n                      dark: \"vs-dark\",\n                    }[localStorage.getItem(\"theme\") || \"light\"]\n                  }\n                  defaultValue={\n                    GetProjectByIdDocumentData?.getProjectByID.coverage\n                  }\n                  onChange={(value) => {\n                    setCoverage(value || \"\");\n                  }}\n                  height={\"240px\"}\n                  language={\"json\"}\n                  options={{\n                    minimap: {\n                      enabled: false,\n                    },\n                    fontSize: 12,\n                    wordWrap: \"wordWrapColumn\",\n                    automaticLayout: true,\n                    scrollBeyondLastLine: false,\n                  }}\n                />\n              )}\n            </div>\n          </div>\n          <Button\n            type={\"primary\"}\n            onClick={() => {\n              try {\n                // coverage用户输入了才检测\n                if (coverage !== \"\") {\n                  JSON.parse(coverage);\n                }\n\n                updateProject({\n                  variables: {\n                    projectID: prm.id,\n                    coverage:\n                      coverage ||\n                      GetProjectByIdDocumentData?.getProjectByID.coverage ||\n                      \"\",\n                    description: \"__null__\",\n                    defaultBranch:\n                      defaultBranch ||\n                      GetProjectByIdDocumentData?.getProjectByID\n                        .defaultBranch ||\n                      \"-\",\n                  },\n                }).then(() => {\n                  showMessage();\n                });\n              } catch (e) {\n                message.error(\"Invalid JSON\");\n              }\n            }}\n          >\n            {t(\"projects.config.save.changes\")}\n          </Button>\n        </Card.Grid>\n      </Card>\n      <div className={\"h-5\"}></div>\n    </div>\n  );\n};\n\nexport default ProjectConfigure;\n","coverage":{"name":"zt"}}