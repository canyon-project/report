window["packages/canyon-platform/src/pages/index/projects/[id]/configure/helper/MemberTable.tsx"] = {"content":"import { UsergroupAddOutlined } from \"@ant-design/icons\";\nimport { useMutation, useQuery } from \"@apollo/client\";\n\nimport {\n  ListUserDocument,\n  UpdateProjectDocument,\n} from \"../../../../../../helpers/backend/gen/graphql.ts\";\nimport CrudTable from \"./crud.tsx\";\nconst { Text } = Typography;\nconst options = [\n  {\n    label: (\n      <div className={\"flex gap-1 flex-col\"}>\n        <Text>所有者</Text>\n        <Text type={\"secondary\"} style={{ fontSize: \"12px\" }}>\n          所有者可以编辑和删除项目、上报记录及团队成员。\n        </Text>\n      </div>\n    ),\n    value: \"owner\",\n  },\n  {\n    label: (\n      <div className={\"flex gap-1 flex-col\"}>\n        <Text>编辑者</Text>\n        <Text type={\"secondary\"} style={{ fontSize: \"12px\" }}>\n          编辑者可以编辑和删除项目、上报记录。\n        </Text>\n      </div>\n    ),\n    value: \"editor\",\n  },\n  {\n    label: (\n      <div className={\"flex gap-1 flex-col\"}>\n        <Text>查看者</Text>\n        <Text type={\"secondary\"} style={{ fontSize: \"12px\" }}>\n          查看者只可查看项目、上报记录。\n        </Text>\n      </div>\n    ),\n    value: \"viewer\",\n  },\n];\n\nconst roleMap = {\n  owner: \"所有者\",\n  editor: \"编辑者\",\n  viewer: \"查看者\",\n};\n\n// Filter `option.label` match the user type `input`\nconst filterOption = (\n  input: string,\n  option?: { label: string; value: string },\n) => (option?.label ?? \"\").toLowerCase().includes(input.toLowerCase());\n\nconst MemberTable = ({ members }) => {\n  const columns = [\n    {\n      title: \"成员\",\n      dataIndex: \"userID\",\n      key: \"userID\",\n      render: (text) => {\n        const find = (userOptions?.listUser || []).find((i) => i.id === text);\n        if (find) {\n          return `${find.nickname} <${find.email}>`;\n        } else {\n          return text;\n        }\n      },\n    },\n    {\n      title: \"角色\",\n      dataIndex: \"role\",\n      key: \"role\",\n      render: (text) => {\n        return roleMap[text];\n      },\n    },\n  ];\n\n  // const dataSource = [];\n  const [dataSource, setDataSource] = useState();\n\n  useEffect(() => {\n    setDataSource(members);\n  }, [members]);\n\n  const { data: userOptions } = useQuery(ListUserDocument);\n\n  const [updateProject] = useMutation(UpdateProjectDocument);\n  const prm = useParams();\n  const onCreate = (v) => {\n    setDataSource([\n      ...dataSource,\n      {\n        ...v,\n      },\n    ]);\n  };\n\n  const onUpdate = (v) => {\n    setDataSource(\n      dataSource.map((i) => {\n        if (i.userID === v.userID) {\n          return v;\n        }\n        return i;\n      }),\n    );\n  };\n\n  const onDelete = ({ userID }) => {\n    setDataSource(dataSource.filter((i) => i.userID !== userID));\n  };\n\n  const onSave = () => {\n    updateProject({\n      variables: {\n        projectID: prm.id as string,\n        members: dataSource.map(({ userID, role }) => ({\n          userID,\n          role,\n        })),\n      },\n    }).then((res) => {\n      message.success(\"保存成功\");\n    });\n  };\n\n  return (\n    <div>\n      <Card\n        title={\n          <div className={\"flex items-center\"}>\n            <UsergroupAddOutlined\n              className={\"text-[#687076] mr-2 text-[16px]\"}\n            />\n            <span>成员</span>\n          </div>\n        }\n      >\n        {/*{JSON.stringify(dataSource)}*/}\n        <CrudTable\n          columns={columns}\n          dataSource={dataSource}\n          loading={false}\n          onCreate={onCreate}\n          onDelete={onDelete}\n          onUpdate={onUpdate}\n          onSave={onSave}\n          formItems={(mode) => (\n            <>\n              <Form.Item label=\"成员\" name=\"userID\">\n                <Select\n                  disabled={mode === \"update\" ? true : false}\n                  placeholder={\"请选择成员\"}\n                  showSearch={true}\n                  filterOption={filterOption}\n                  options={(userOptions?.listUser || []).map(\n                    ({ email, id, nickname }) => ({\n                      label: `${nickname} <${email}>`,\n                      value: id,\n                    }),\n                  )}\n                />\n              </Form.Item>\n\n              <Form.Item label=\"角色\" name=\"role\">\n                <Select\n                  options={options}\n                  placeholder={\"请选择角色\"}\n                  labelRender={({ value }) => {\n                    return <Text>{roleMap[value]}</Text>;\n                  }}\n                />\n              </Form.Item>\n            </>\n          )}\n        />\n      </Card>\n    </div>\n  );\n};\n\nexport default MemberTable;\n","coverage":{"name":"zt"}}