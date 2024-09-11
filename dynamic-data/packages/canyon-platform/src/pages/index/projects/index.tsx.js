window["packages/canyon-platform/src/pages/index/projects/index.tsx"] = {"content":"import {\n  FolderOutlined,\n  HeartFilled,\n  HeartOutlined,\n  PlusOutlined,\n  QuestionCircleOutlined,\n} from \"@ant-design/icons\";\nimport { useMutation, useQuery } from \"@apollo/client\";\nimport { ColumnsType } from \"antd/es/table\";\nimport { TextTypography } from \"../../../components/ui\";\nimport dayjs from \"dayjs\";\nimport { useState } from \"react\";\nimport { useTranslation } from \"react-i18next\";\nimport { Link } from \"react-router-dom\";\n\nimport { CanyonCardPrimary } from \"../../../components/old-ui\";\nimport {\n  DeleteProjectDocument,\n  FavorProjectDocument,\n  GetProjectsBuOptionsDocument,\n  GetProjectsDocument,\n  GetProjectsTagOptionsDocument,\n  Project,\n} from \"../../../helpers/backend/gen/graphql.ts\";\n\nconst { Text } = Typography;\n\nfunction countingStars(num: any) {\n  if (num >= 75 && num < 80) {\n    return \"🌟\";\n  } else if (num >= 80 && num < 85) {\n    return \"🌟🌟\";\n  } else if (num >= 85 && num < 90) {\n    return \"🌟🌟🌟\";\n  } else if (num >= 90 && num < 95) {\n    return \"🌟🌟🌟🌟\";\n  } else if (num >= 95 && num <= 100) {\n    return \"🌟🌟🌟🌟🌟\";\n  }\n}\nconst ProjectPage = () => {\n  const { t } = useTranslation();\n  const [deleteProject] = useMutation(DeleteProjectDocument);\n  const [favorProject] = useMutation(FavorProjectDocument);\n  const columns: ColumnsType<Project> = [\n    {\n      title: \"ID\",\n      dataIndex: \"id\",\n      key: \"id\",\n      render(text, record) {\n        return (\n          <Space>\n            <div\n              className={\"favor-heart\"}\n              style={{ visibility: record.favored ? \"unset\" : undefined }}\n              onClick={() => {\n                favorProject({\n                  variables: {\n                    projectID: record.id,\n                    favored: !record.favored,\n                  },\n                }).then(() => {\n                  refetch().then(() => {\n                    message.success(\"success\");\n                  });\n                });\n              }}\n            >\n              {record.favored ? (\n                <HeartFilled style={{ color: \"red\" }} />\n              ) : (\n                <HeartOutlined />\n              )}\n            </div>\n            {text.split(\"-\")[1]}\n          </Space>\n        );\n      },\n    },\n    {\n      title: t(\"projects.slug\"),\n      dataIndex: \"id\",\n      key: \"slug\",\n      render(text) {\n        return (\n          <span className={\"max-w-[80px] block\"}>{text.split(\"-\")[2]}</span>\n        );\n      },\n    },\n    {\n      title: t(\"projects.name\"),\n      dataIndex: \"pathWithNamespace\",\n      key: \"pathWithNamespace\",\n      render: (text, record) => {\n        return (\n          <div className={\"flex gap-1\"}>\n            <div>\n              <img\n                src=\"/gitproviders/gitlab.svg\"\n                alt=\"\"\n                className={\"w-[16px]\"}\n              />\n            </div>\n\n            <span style={{ width: \"4px\", display: \"inline-block\" }}></span>\n            <div className={\"flex gap-1 flex-col\"}>\n              <a\n                className={\"max-w-[240px]\"}\n                style={{ color: \"unset\" }}\n                target={\"_blank\"}\n                // @ts-ignore\n                href={`${window.GITLAB_URL}/${text}`}\n                rel=\"noreferrer\"\n              >\n                {text}\n              </a>\n              <Text\n                type={\"secondary\"}\n                style={{ fontSize: \"12px\", width: \"240px\" }}\n              >\n                {record.description}\n              </Text>\n            </div>\n          </div>\n        );\n      },\n    },\n    {\n      title: \"Bu\",\n      dataIndex: \"bu\",\n      sorter: true,\n    },\n    {\n      title: t(\"projects.report_times\"),\n      dataIndex: \"reportTimes\",\n      sorter: true,\n    },\n    {\n      title: (\n        <>\n          <Tooltip\n            title={t(\"projects.max_coverage_tooltip\")}\n            className={\"mr-2\"}\n          >\n            <QuestionCircleOutlined />\n          </Tooltip>\n          {t(\"projects.max_coverage\")}\n        </>\n      ),\n      dataIndex: \"maxCoverage\",\n      key: \"maxCoverage\",\n      sorter: true,\n      render: (text) => {\n        return (\n          <Space>\n            {text}%{countingStars(text)}\n          </Space>\n        );\n      },\n    },\n    {\n      title: t(\"projects.latest_report_time\"),\n      dataIndex: \"lastReportTime\",\n      sorter: true,\n      render(_) {\n        return <span>{dayjs(_).format(\"MM-DD HH:mm\")}</span>;\n      },\n    },\n    {\n      title: t(\"common.option\"),\n      key: \"option\",\n      render: (_, { id }) => (\n        <>\n          <Link\n            to={{\n              pathname: `/projects/${id}`,\n            }}\n          >\n            {t(\"common.detail\")}\n          </Link>\n          <Divider type={\"vertical\"} />\n          <Popconfirm\n            title=\"Delete the project\"\n            description=\"Are you sure to delete this project?\"\n            onConfirm={() => {\n              deleteProject({\n                variables: {\n                  projectID: id,\n                },\n              }).then(() => {\n                refetch();\n              });\n            }}\n            onCancel={() => {\n              console.log(\"cancel\");\n            }}\n            okText=\"Yes\"\n            cancelText=\"No\"\n          >\n            <a className={\"text-red-500 hover:text-red-600\"}>\n              {t(\"common.delete\")}\n            </a>\n          </Popconfirm>\n        </>\n      ),\n    },\n  ];\n  const initBu = (() => {\n    try {\n      if (JSON.parse(localStorage.getItem(\"bu\") || \"[]\") instanceof Array) {\n        return JSON.parse(localStorage.getItem(\"bu\") || \"[]\");\n      } else {\n        return [];\n      }\n    } catch (e) {\n      return [];\n    }\n  })();\n\n  const initTag = (() => {\n    return localStorage.getItem(\"tag\") || \"\";\n  })();\n  const initFavorOnly = Boolean(localStorage.getItem(\"favorOnlyFilter\"));\n  const [keyword, setKeyword] = useState(\"\");\n  const [favorOnly, setFavorOnly] = useState(initFavorOnly);\n  const [bu, setBu] = useState<string[]>(initBu);\n  const [tag, setTag] = useState<string>(initTag);\n  const [current, setCurrent] = useState(1);\n  const [pageSize, setPageSize] = useState(10);\n  const [sorter, setSorter] = useState<any>({});\n\n  const { data: projectsBuOptionsData } = useQuery(\n    GetProjectsBuOptionsDocument,\n    {\n      fetchPolicy: \"no-cache\",\n    },\n  );\n\n  const { data: projectsTagOptionsData } = useQuery(\n    GetProjectsTagOptionsDocument,\n    {\n      fetchPolicy: \"no-cache\",\n    },\n  );\n\n  const {\n    data: projectsData,\n    loading,\n    refetch,\n  } = useQuery(GetProjectsDocument, {\n    variables: {\n      current: current,\n      pageSize: pageSize,\n      keyword: keyword,\n      bu: bu,\n      tag: tag,\n      lang: [\"JavaScript\"],\n      field: sorter.field || \"\",\n      order: sorter.order || \"\",\n      favorOnly: favorOnly,\n    },\n    fetchPolicy: \"no-cache\",\n  });\n\n  return (\n    <>\n      <TextTypography\n        title={t(\"menus.projects\")}\n        icon={<FolderOutlined />}\n        right={\n          <Link to={`/projects/new`}>\n            <Button type={\"primary\"} icon={<PlusOutlined />}>\n              {t(\"projects.create\")}\n            </Button>\n          </Link>\n        }\n      />\n\n      <div>\n        <div className={\"flex justify-between\"}>\n          <div>\n            <Select\n              defaultValue={initBu}\n              mode=\"multiple\"\n              onChange={(v) => {\n                setBu(v);\n                localStorage.setItem(\"bu\", JSON.stringify(v));\n              }}\n              placeholder={\"Bu\"}\n              className={\"w-[200px] mr-2\"}\n              options={(projectsBuOptionsData?.getProjectsBuOptions || []).map(\n                ({ bu, count }) => ({\n                  label: bu + ` ${count}`,\n                  value: bu,\n                }),\n              )}\n            />\n\n            <Select\n              allowClear={true}\n              defaultValue={initTag || undefined}\n              onChange={(v) => {\n                setTag(v || \"\");\n                localStorage.setItem(\"tag\", v || \"\");\n              }}\n              placeholder={\"Tag\"}\n              className={\"w-[200px] mr-2\"}\n              options={(\n                projectsTagOptionsData?.getProjectsTagOptions || []\n              ).map(({ name }) => ({\n                label: name,\n                value: name,\n              }))}\n            />\n\n            <Input.Search\n              placeholder={t(\"projects.search_keywords\")}\n              className={\"w-[420px] mb-3\"}\n              onSearch={(value) => {\n                setKeyword(value);\n                setCurrent(1);\n              }}\n            />\n            <Space className={\"ml-5\"}>\n              <Text type={\"secondary\"}>{t(\"common.favor.only\")}: </Text>\n              <Switch\n                checkedChildren={<HeartFilled />}\n                defaultChecked={Boolean(\n                  localStorage.getItem(\"favorOnlyFilter\"),\n                )}\n                onChange={(v) => {\n                  if (v) {\n                    localStorage.setItem(\"favorOnlyFilter\", \"1\");\n                  } else {\n                    localStorage.removeItem(\"favorOnlyFilter\");\n                  }\n                  setFavorOnly(v);\n                }}\n              />\n            </Space>\n          </div>\n        </div>\n\n        <CanyonCardPrimary>\n          <Table\n            showSorterTooltip={false}\n            loading={loading}\n            rowKey={\"id\"}\n            pagination={{\n              total: projectsData?.getProjects?.total,\n              showTotal: (total) => t(\"common.total_items\", { total }),\n              current,\n              pageSize,\n            }}\n            bordered={false}\n            dataSource={projectsData?.getProjects?.data || []}\n            // @ts-ignore\n            columns={columns}\n            onChange={(val, _, _sorter: any) => {\n              setSorter({\n                field: _sorter.field,\n                order: _sorter.order,\n              });\n              setCurrent(val.current || 1);\n              setPageSize(val.pageSize || 10);\n            }}\n          />\n        </CanyonCardPrimary>\n      </div>\n    </>\n  );\n};\n\nexport default ProjectPage;\n","coverage":{"name":"zt"}}