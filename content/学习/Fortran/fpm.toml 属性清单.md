---
created: 2025-03-27
modified: 2025-03-27
draft: false
tags:
  - Fortran
  - fpm
finished: true
---

- 主页：[Manifest reference — Fortran Package Manager](https://fpm.fortran-lang.org/spec/manifest.html)

## `fpm.toml` 样例

```toml
# 项目相关信息
name = "hello_world"
version = "1.0.0"
maintainer = "alpraline1999@google.com"
author = "Alpraline"
copyright = "Copyright 2025 Alpraline"
description = "A example fpm.toml file"
categories = ["fpm"]
keywords = ["toml", "example"]
homepage = "https://stdlib.fortran-lang.org"

# Fortran语言特性
[fortran] 
implicit-typing = true  # default: false 使用默认隐式类型
implicit-external = true  # default: false 可以隐式声明外部接口
source-form = "fixed"  # default: "free" 源文件格式

# 依赖项
[dependencies] 
# 版本控制
toml-f = { git = "https://github.com/toml-f/toml-f" } 
toml-f = { git = "https://github.com/toml-f/toml-f", branch = "main" } # 特定分支
toml-f = { git = "https://github.com/toml-f/toml-f", tag = "v0.2.1" } # teg 引用
toml-f = { git = "https://github.com/toml-f/toml-f", rev = "2f5eaba" } # 哈希值
# 来自fpm注册表的依赖项，需要指定命名空间
example-package.namespace = "example-namespace" 
example-package.v = "1.0.0" # 版本号
# 本地依赖项
my-utils = { path = "utils" } # 相对路径从当前项目 fpm.toml 出发

# 开发依赖，该根目录可用于所有测试，但不能随项目一起导出
[dev-dependencies]

# 库文件相关
[library] 
source-dir = "lib" # 库文件目录
include-dir = "inc" # include 文件目录，可以是列表
# include-dir = ["include", "third_party/include"]

# 构建相关
[build] 
# 链接外部库，被依赖项在后，依赖项在前，应在 library.source-dir 中？
link = ["lapack", "blas"]
# 外部模块，应在 include-dir 中
external-modules = ["netcdf", "h5lt"] 
# 自动发现设置
auto-executables = false # default true  app/
auto-examples = false #default true  example/
auto-tests = false #default true  test/

# 安装
[install]
library=true # 是否安装库

# 目标
[[executable]] 
name = "app-name" # 可执行目标名
source-dir = "prog" # 源文件目录
main = "program.f90" # 源文件名
link = "z" # 链接库
[executable.dependencies] # 可执行目标依赖项
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }

# 样例
[[example]] 
name = "demo-app"
source-dir = "demo"
main = "program.f90"
link = "z"
[example.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }

# 测试
[[test]] 
name = "test-name"
source-dir = "testing"
main = "tester.F90"
link = ["lapack", "blas"]
[test.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }

# 预处理器
[preprocess]
# 指定预处理器
[preprocess.cpp]
suffixes = ["F90", "f90"]
directories = ["src/feature1", "src/models"]
macros = ["FOO", "BAR"] 
# macros=["FOO=2", "BAR=4"]
# macros=["VERSION={version}"]
[preprocess.fypp] # 多个预处理器
```

## 项目信息 Project Info

### 项目名 Project name

- 项目名称用于标识软件包并对其进行引用
- 它用于**将项目列为另一个软件包的依赖项**，以及**库和可执行目标的默认名称**
- **项目名称必须存在**

*Example:*

```toml
name = "hello_world"
```

### 项目版本号 Project Version

- 版本号为字符串，标准的版本管理办法参考 [Semantic Versioning](https://semver.org/lang/zh-CN/)

- 版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
    1. 主版本号：当你做了**不兼容**的 API 修改，
    2. 次版本号：当你做了向下兼容的**功能性新增**，
    3. 修订号：当你做了向下兼容的**问题修正**。

- 先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸

*Example:*

```toml
version = "1.0.0"
```

*Example:*

- 版本号还可以包含一个相对于项目根目录的文件名，其中包含项目的版本号

```toml
version = "VERSION"
```

### 项目许可证 [Project license](https://fpm.fortran-lang.org//spec/manifest.html#project-license "Permalink to this headline")

- 项目许可证字段包含许可证标识符，指定许可证的标准办法参考 [SPDX](https://spdx.org/licenses/)

*Examples:*

- 使用 [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0-standalone.html) 许可证, 版本号 3.0 及以上

```toml
license = "LGPL-3.0-or-later"
```

- 使用 [Apache license, version 2.0](http://www.apache.org/licenses/LICENSE-2.0) 或 [MIT license](https://opensource.org/licenses/MIT) 许可证

```toml
license = "Apache-2.0 OR MIT"
```

### 项目维护者 Project Maintainer

- 项目维护者的信息和联系方式

*Example:*

```toml
maintainer = "jane.doe@example.com"
```

### 项目作者 Project Author

- 项目作者信息

*Example:*

```toml
author = "Jane Doe"
```

### 项目版权 Project Copyright

- 项目版权状态的声明

*Example:*

```toml
copyright = "Copyright 2020 Jane Doe"
```

### 项目描述 Project Description

- 项目的简短描述，只能是纯文本，不能包含标记语言格式

*Example:*

```toml
description = "A short summary on this project"
```

### 项目类别 Project Categories

- 项目类别

*Example:*

```toml
categories = ["io"]
```

### 项目关键词 Project Keywords

- 用于描述项目的字符串列表

*Example:*

```toml
keywords = ["hdf5", "mpi"]
```

### 项目主页 Project Homepage

- 项目主页链接

*Example:*

```toml
homepage = "https://stdlib.fortran-lang.org"
```

## 项目目标 Project Targets

- 每个 fpm 项目可以定义一些目标：**库**，**可执行**，**测试**和**样例**

- 库目标可以被导出并用于其他项目。

### 依赖库配置 Library Configuration

- 定义项目导出的库目标
- 如果在项目中找到**源代码目录**或**包含目录**，就会生成一个库
- 默认的源代码目录和包含目录分别是 `src` 和 `include`，可以在 *library* 部分使用 *source-dir* 和 *include-dir* 条目对其进行修改
- 源代码和包含目录的路径相对于项目根目录，并在所有平台上使用 `/` 作为路径分隔符。

*Example:*

```toml
[library]
source-dir = "lib"
include-dir = "inc"
```

#### 包含目录 Include Directory

> [!INFO] Note
> 仅在 Fortran fpm 中支持

- 项目会搜索 *include-dir* 目录下的文件，并识别 Fortran 的 `include` 语句或 C 预处理器的 `#include` 语句
- *include-dir* 可以包含一个或多个目录，通过字符串列表指定
- 所有项目依赖的包含目录会通过合适的编译器标志传递给编译器。

*Example:*

```toml
[library]
include-dir = ["include", "third_party/include"]
```

> [!INFO] Note
> *include-dir* 目前不允许使用预编译的 `.mod` 文件

### 可执行目标 Executable Targets

- 可执行目标是定义为 *executable* 部分的 Fortran 程序
- 如果要显式定义名称，必须指定 *name* 项
- 源代码目录可以在 *source-dir* 项中指定
- 源代码目录相对于项目根目录，并在所有平台上使用 `/` 作为路径分隔符
- 包含程序主体的源文件可以在 *main* 项中指定
- 可以有独立的依赖项目，参考 [specifying dependencies](https://fpm.fortran-lang.org/spec/manifest.html#specifying-dependencies)
- 可以有独立的外部依赖库，参考 [external libraries](https://fpm.fortran-lang.org/spec/manifest.html#link-external-libraries)

> [!INFO] Note
> 仅在 Fortran fpm 中支持针对库的链接

*Example:*

```toml
[[executable]]
name = "app-name"
source-dir = "prog"
main = "program.f90"

[[executable]]
name = "app-tool"
link = "z"
[executable.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }
```

- 为简洁起见，可使用内联表格来指定多个独立的可执行文件

```toml
executable = [
  { name = "a-prog" },
  { name = "app-tool", source-dir = "tool" },
]
```

### 样例目标 Example Targets

- 与可执行目标的配置基本相同，默认的源文件目录为 `example`
- 如果要显式定义名称，必须指定 *name* 项
- 源代码目录可以在 *source-dir* 项中指定
- 源代码目录相对于项目根目录，并在所有平台上使用 `/` 作为路径分隔符
- 包含程序主体的源文件可以在 *main* 项中指定
- 可以有独立的依赖项目，参考 [specifying dependencies](https://fpm.fortran-lang.org/spec/manifest.html#specifying-dependencies)
- 可以有独立的外部依赖库，参考 [external libraries](https://fpm.fortran-lang.org/spec/manifest.html#link-external-libraries)

> [!INFO] Note
> 仅在 Fortran fpm 中支持针对库的链接

*Example:*

```toml
[[example]]
name = "demo-app"
source-dir = "demo"
main = "program.f90"

[[example]]
name = "example-tool"
link = "z"
[example.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }
```

### 测试目标 Test Targets

- 与可执行目标的配置基本相同，默认的源文件目录为 `test`
- 如果要显式定义名称，必须指定 *name* 项
- 源代码目录可以在 *source-dir* 项中指定
- 源代码目录相对于项目根目录，并在所有平台上使用 `/` 作为路径分隔符
- 包含程序主体的源文件可以在 *main* 项中指定
- 可以有独立的依赖项目，参考 [specifying dependencies](https://fpm.fortran-lang.org/spec/manifest.html#specifying-dependencies)
- 可以有独立的外部依赖库，参考 [external libraries](https://fpm.fortran-lang.org/spec/manifest.html#link-external-libraries)

> [!INFO] Note
> 仅在 Fortran fpm 中支持针对库的链接

*Example:*

```toml
[[test]]
name = "test-name"
source-dir = "testing"
main = "tester.F90"

[[test]]
name = "tester"
link = ["lapack", "blas"]
[test.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }
```

## 链接外部库 Link External Libraries

> [!INFO] Note
> 仅在 Fortran fpm 中支持

- 要声明链接时对外部库的依赖关系，可以在 *link* 项中指定本地库列表
- 以字符串形式指定一个库，链接多个库需要指定字符串列表
- **在可能的情况下，项目应只链接一个本地程序库**
- 库依赖关系列表会导出到依赖包中

*Example:*

- 链接 zlib 库

```toml
[build]
link = "z"
```

- 在链接具有依赖关系的多个库时，**一个库必须出现在它所依赖的库之前**
- 例如，LAPACK 依赖于 BLAS, BLAS 在列表中必须排在后面

```toml
[build]
link = ["lapack", "blas"]
```

## 使用系统安装库 Use System-installed Modules

- 要使用 fpm 软件包或其依赖包中**未定义**的模块，请使用 *build* 表中的 *external-modules* 键指定模块名称

> [!Important]
> *fpm* 不能自动定位外部模块文件；用户需要使用编译器标志指定必要的包含目录，以便编译器在编译过程中定位外部模块文件。

*Example:*

```toml
[build]
external-modules = "netcdf"
```

- 多个外部库可以通过列表指定

*Example:*

```toml
[build]
external-modules = ["netcdf", "h5lt"]
```

## 自动发现目标 Automatic Target Discovery

> [!INFO] Note
> 仅在 Fortran fpm 中支持。

- 可在默认目录中自动发现可执行，样例和测试
- 自动发现功能会递归搜索 `app`、`example` 和 `test` 目录中的 `program` 定义，并分别将其声明为可执行、样例和测试目标
- 自动发现默认为启用
- 要禁用自动发现目标，请将 *auto-executables*、*auto-examples* 和 *auto-tests* 项设置为 *false*

```toml
[build]
auto-executables = false
auto-examples = false
auto-tests = false
```

## Fortran 特性 Fortran Features

- 允许启用或禁用指定 Fortran 语言特性

### 隐式类型 Implicit Typing

- 是否启用默认隐式类型
- 默认选项为禁用 `false`

```toml
[fortran]
implicit-typing = true  # default: false
```

### 隐式外部接口 Implicit External

- 外部接口是否可以被隐式声明
- 默认选项为禁用 `false`

```toml
[fortran]
implicit-external = true  # default: false
```

### 代码格式 Source Form

允许指定项目中所有文件使用的源代码形式
- 可选项有 
    - "free"，表示所有文件都是自由形式的源代码
    - "fixed"，表示所有文件都是固定形式的源代码
    - "default"，表示让编译器根据自己的启发式方法（heuristics）来决定
- 默认选项为 "free"

```toml
[fortran]
source-form = "fixed"  # default: "free"
```

## 指定依赖 Specifying Dependencies

- 依赖项可以在根目录的 *dependencies* 表或 *excutable*，*example*，*test* 部分中声明
- 在根目录中声明时，依赖项会随项目一起导出

### 从版本控制系统指定依赖项 Dependencies from Version Control Systems

- 依赖项可以通过项目的 git 仓库指定

```toml
[dependencies]
toml-f = { git = "https://github.com/toml-f/toml-f" }
```

- 可以使用 *branch* 指定分支
To use a specific upstream branch declare the *branch* name with

```toml
[dependencies]
toml-f = { git = "https://github.com/toml-f/toml-f", branch = "main" }
```

- 可以使用 *tag* 指定分支

```toml
[dependencies]
toml-f = { git = "https://github.com/toml-f/toml-f", tag = "v0.2.1" }
```

- 可以在 *rev* 项指定提交的 hash 来选择版本

```toml
[dependencies]
toml-f = { git = "https://github.com/toml-f/toml-f", rev = "2f5eaba" }
```

- 如需更详细的布局，请使用普通表而不是内联表来指定依赖关系

```toml
[dependencies]
[dependencies.toml-f]
git = "https://github.com/toml-f/toml-f"
rev = "2f5eaba864ff630ba0c3791126a3f811b6e437f3"
```

### 从注册表指定依赖项 Dependencies from a Registry

> ![info]Note
> 要在 fpm 中使用注册表，请务必先阅读 [registry section](https://fpm.fortran-lang.org/registry/index.html) 中的说明

#### 命名空间 Namespace

- 从注册表（包括远程和本地注册表）获取的软件包必须指定命名空间
- 命名空间为唯一标识和区分具有相同名称的软件包提供了一种方法
- 命名空间在清单（`fpm.toml`）中声明

```toml
[dependencies]
my-package.namespace = "my-namespace"
```

- 这会告诉 fpm 从注册表下载命名空间为 my-namespace 的最新版本 my-package

#### 版本 Version

- 如果想下载指定版本，可以指定版本号 `v`

```toml
[dependencies]
example-package.namespace = "example-namespace"
example-package.v = "1.0.0"
```

### 本地依赖项 Local Dependencies

- 使用 *path* 项指定本地依赖项

```toml
[dependencies]
my-utils = { path = "utils" }
```

- 本地依赖项的路径相对于写入的 `fpm.toml`，并且在所有平台上使用 `/` 作为路径分隔符

### 特定于依赖关系的宏设置 Dependency-specific Macro Setting

- 对于 `fpm>=0.9.1`, 可以从清单中将特定于依赖项的宏数组传递给单个依赖项，传递方式与清单表中的方式相同
- fpm 不会检查传递的宏是否与依赖库自身的清单相冲突，因此用户需要确保不会发生冲突或意外行
- 例：控制一个库使用的 `REAL` 精度

```toml
[dependencies]
fftpack = { git="https://github.com/fortran-lang/fftpack.git", preprocess.cpp.macros = ["REAL32"] }
```

### 开发依赖项 Development Dependencies

- 开发依赖项在 toml 表根目录使用 *dev-dependencies* 声明
- 这样**允许所有测试使用依赖项，但不会导出依赖项目**

## 安装配置 Installation Configuration

- *install* 部分的安装组件是可选的
- 默认只有可执行文件会被安装
- 库项目可以设置 *library* 为 `true`，以安装模块文件和存档

*Example*

```toml
[install]
library = true
```

## 预处理器配置 Preprocessor Configuration

### 指定处理器 Specifying the Preprocessor

- 在预处理器 *preprocess* 部分，可以指定一个或多个预处理器
- 例如，指定 `cpp`

*Example*

```toml
[preprocess]
[preprocess.cpp]
```

- 指定多个预处理器，如 `cpp` 和 `fypp`

*Example*

```toml
[preprocess]
[preprocess.cpp]
[preprocess.fypp]
```

- 可以指定预处理器需要处理的文件后缀

*Example*

```toml
[preprocess]
[preprocess.cpp]
suffixes = ["F90", "f90"]
```

- 可以指定预处理器需要处理的文件目录

*Example*

```toml
[preprocess]
[preprocess.cpp]
directories = ["src/feature1", "src/models"]
```

- 可以指定预处理器宏

*Example*

```toml
[preprocess]
[preprocess.cpp]
macros = ["FOO", "BAR"]
```

- 可以使用 `.` 定义预处理器设置

*Example*

```toml
[preprocess]
cpp.suffixes = ["F90", "f90"]
cpp.directories = ["src/feature1", "src/models"]
cpp.macros = ["FOO", "BAR"]
```

- 在预处理器表中可以定义赋值的宏

*Example*

```toml
[preprocess]
[preprocess.cpp]
macros=["FOO=2", "BAR=4"]
```

- 可以复用表单中的值（如版本号）用于给宏赋值

*Example*

```toml
version = "1"

[preprocess]
[preprocess.cpp]
macros=["VERSION={version}"]
```

## 自定义数据 Additional Free Data Field

- 第三方工具的配置可以在额外 *extra* 部分设置，该部分不会被 fpm 处理，但需要是合法的 TOML 格式
- 这部分数据是自定义的，以下是对 *extra* 部分自定义数据的一些建议：
    1. 只使用子表，不要在 *extra* 部分使用最高级表单。理由：不同工具之间可以通过子表单分割数据以避免冲突
    2. 子表使用具体名称（concrete name）而非一般名称（generic name）。理由：不同格式化或 linter 工具可能会在 *format* 或 *linter* 子表单中出现关键字冲突，此外用户还可以从表单名称中看出项目更倾向于使用哪种工具
    3. Fpm 插件应在 *extra.fpm* 部分使用包含插件名称的子表来存储数据。理由：遵循这一惯例可为 Fpm 插件用户提供一个配置其使用的插件的部分
    4. 使用 fpm 偏好的关键字样式，即小写加破折号。理由：虽然这一部分没有样式检查，但整个清单的样式一致会让用户更容易理解整个软件包清单

欢迎对上述建议提出反馈意见。如果有使用软件包清单中 *extra* 部分的工具，请随时在[fpm 讨论区](https://github.com/fortran-lang/fpm/discussions)发布。
