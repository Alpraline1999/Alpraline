---
created: 2025-03-26
modified: 2025-03-27
tags:
  - Fortran
  - fpm
finished: true
draft: false
---

## Fortran Package Manager (*fpm*)

Fortran的软件包管理器和构建系统

- 主页：[Fortran Package Manager](https://fpm.fortran-lang.org/index.html)
- Github：[fortran-lang/fpm:](https://github.com/fortran-lang/fpm)

## 安装

- 安装教程：[安装fpm — Fortran Package Manager](https://fpm.fortran-lang.org/zh_CN/install/index.html)
- 我是Windows系统，使用[MSYS2](https://www.msys2.org/)安装的 *gfortran* 和 *fpm*
    - 教程：[Package Management - MSYS2](https://www.msys2.org/docs/package-management/)

## 使用

### 单程序

- 项目目录

```shell
.
├── app
│   └── main.f90
└── fpm.toml
```

- `app/main.f90`

```fortran
program main
    print *, 'Hello, World!'
end program main
```

- `fpm.toml`，fpm配置文件

```toml
name = "hello"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline"
```

#### 构建

- 使用`fpm build`进行构建，这里没有特殊设置，会调用默认的编译器（我这里是`gfortran`）

```shell
> fpm build
+ mkdir build\dependencies
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
```

- 构建成功的话会创建一个`build`文件夹，生成的可执行文件在`build/xxx/app`下

```shell
.
├─app
└─build
    ├─dependencies
    ├─gfortran_87E2AE0597D39913
    │  └─hello
    └─gfortran_E167FD2A985B468F
        └─app
```

#### 运行

- 使用`fpm run`运行

```shell
> fpm run
Project is up to date
 Hello, World!
```

- 不经过`fpm build`直接使用`fpm run`，会构建最新的项目，然后直接运行；如果项目已经是最新的，就会显示上面的**Project is up to date**

```shell
> fpm run        
 + mkdir build\dependencies
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
 Hello, World!
```

#### 内部模块

- 其他不变，在`app/main.f90`中添加一个内部模块

```fortran
module math_constants
    real, parameter :: pi = 4 * atan(1.)
end module math_constants

program main
    use math_constants, only: pi
    print *, 'Hello, World!'
    print *, 'pi = ', pi
end program main
```

- 现在使用`fpm run`运行

```shell
> fpm run        
 + mkdir build\dependencies
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
 Hello, World!
 pi =    3.14159274
```

### 错误信息

使用 `fpm run` 运行应用程序时，程序的退出代码将通过 *fpm* 传递回作系统。因此，可以使用Fortran编号的`stop`和`error stop`代码将终止原因传递回终端。

- 项目结构

```shell
.
├── app
│   ├── main.f90
│   └── math_constants.f90
└── fpm.toml
```

- `app/main.f90`

```fortran
program main
  use math_constants, only: pi

  real :: angle
  integer :: ierr  

  read (*, *, iostat=ierr) angle
  if (ierr /= 0) then
    stop 2 ! Not real
  elseif (angle > pi) then
    stop 1
  else
    stop 0
  end if
end program main
```

- `app/math_constants.f90`

```fortran
module math_constants
  real, parameter :: pi = 4*atan(1.)
end module math_constants
```

#### 退出和错误退出

- `fpm run`和直接运行，分别输入`1`、`4`、`r`的结果

```shell
> fpm run
 + mkdir build\dependencies
math_constants.f90                     done.
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
> 1
STOP 0

> .\build\gfortran_E167FD2A985B468F\app\hello.exe
> 1
STOP 0
```

```shell
> fpm run
Project is up to date
> 4
STOP 1
<ERROR> Execution for object " hello.exe " returned exit code  1
<ERROR> *cmd_run*:stopping due to failed executions
STOP 1

> .\build\gfortran_E167FD2A985B468F\app\hello.exe
> 4
STOP 1
```

```shell
> fpm run
Project is up to date
> r
STOP 2
<ERROR> Execution for object " hello.exe " returned exit code  2
<ERROR> *cmd_run*:stopping due to failed executions
STOP 2

> .\build\gfortran_E167FD2A985B468F\app\hello.exe
> r
STOP 2
```

### 单模块库

- 项目结构

```shell
.
├── fpm.toml
└── src
    └── math_constants.f90
```

- `src/math_constants.f90`

```fortran
module math_constants
    real, parameter :: pi = 4 * atan(1.)
end module math_constants
```

- `fpm.toml`不变

#### 构建

- 对于顶级目录`src`中的模块，*fpm* 要求：
    - 该**模块与源文件同名**
    - 每个文件**只有一个模块**
- 这样可以将源文件`.f90`唯一且精确地映射到其对象`.o`和模块`.mod`文件，并且避免与依赖项包中可能出现的同名模块发生冲突（稍后会详细介绍）

```shell
> fpm build
 + mkdir build\dependencies
math_constants.f90                     done.
libhello.a                             done.
[100%] Project compiled successfully.
```

### 多模块库

- 项目结构

```shell
.
├── fpm.toml
└── src
    ├── math_constants.f90
    └── type_kinds.f90
```

- `src/math_constans.f90`

```fortran
module math_constants
    use type_kinds, only: rk
    real(rk), parameter :: pi = 4 * atan(1._rk)
    real(rk), parameter :: e = exp(1._rk)
end module math_constants
```

- `src/type_kinds.f90`

```fortran
module type_kinds
    use iso_fortran_env, only: real64
    integer, parameter :: rk = real64
end module type_kinds
```

#### 构建

```shell
> fpm build
 + mkdir build\dependencies
type_kinds.f90                         done.
math_constants.f90                     done.
libhello.a                             done.
[100%] Project compiled successfully.
```

### 应用程序和库

- 项目结构

```shell
.
├── app
│   └── main.f90
├── fpm.toml
└── src
    ├── math_constants.f90
    └── type_kinds.f90
```

- `app/main.f90`

```fortran
program main
    use math_constants, only: e, pi
    print *, 'math_constants library demo'
    print *, 'pi = ', pi
    print *, 'e = ', e
end program main
```

- `fpm.toml`，`math_constants`和`type_kinds`不变

#### 运行

```shell
> fpm run
 + mkdir build\dependencies
type_kinds.f90                         done.
math_constants.f90                     done.
libhello.a                             done.
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
 math_constants library demo
 pi =    3.1415926535897931
 e =    2.7182818284590451
```

### 多级库

- 项目结构

```shell
.
├── app
│   └── main.f90
├── fpm.toml
└── src
    ├── math_constants
    │   ├── derived.f90
    │   └── fundamental.f90
    ├── math_constants.f90
    └── type_kinds.f90
```

- `fpm.toml`和`type_kinds`不变
- 源文件
    - 可以将模块源文件放在`src`中**任何级别**的子目录中
    - 模块名称**必须包含路径组件和源文件名**，例如`src/a/b/c/d.f90`必须定义一个名为`a_b_c_d`的模块
    - 例子中`src/math_constants/fundamental.f90`定义了`math_constants_fundamental`；`src/math_constants/derived.f90`定义了`math_constants_derived`

```fortran
! src/math_constants.f90
module math_constants
    use math_constants_fundamental, only: e, pi
    use math_constants_derived, only: half_pi, two_pi
end module math_constants

! src/math_constants/fundamental.f90
module math_constants_fundamental
    use type_kinds, only: rk
    real(rk), parameter :: pi = 4 * atan(1._rk)
    real(rk), parameter :: e = exp(1._rk)
end module math_constants_fundamental

! src/math_constants/derived.f90
module math_constants_derived
    use math_constants_fundamental, only: pi
    use type_kinds, only: rk
    real(rk), parameter :: two_pi = 2 * pi
    real(rk), parameter :: half_pi = pi / 2
end module math_constants_derived

! app/main.f90
program main
    use math_constants, only: e, pi, half_pi, two_pi
    print *, 'math_constants library demo'
    print *, 'pi = ', pi
    print *, '2*pi = ', two_pi
    print *, 'pi/2 = ', half_pi
    print *, 'e = ', e
end program main
```

#### 运行

```shell
> fpm run
 + mkdir build\dependencies
type_kinds.f90                         done.
fundamental.f90                        done.
derived.f90                            done.
math_constants.f90                     done.
libhello.a                             done.
main.f90                               done.
hello.exe                              done.
[100%] Project compiled successfully.
 math_constants library demo
 pi =    3.1415926535897931
 2*pi =    6.2831853071795862
 pi/2 =    1.5707963267948966
 e =    2.7182818284590451
```

### 修改文件夹

- 上例中，所有的文件夹都是默认指定的，但是可以在`fpm.toml`中修改
- 如果将项目结构修改如下

```shell
.
├── application
│   └── main.f90
├── fpm.toml
└── source
    ├── math_constants
    │   ├── derived.f90
    │   └── fundamental.f90
    ├── math_constants.f90
    └── type_kinds.f90
```

- 不修改`fpm.toml`，*fpm* 无法找到库和可执行文件的源代码，运行结果

```shell
> fpm run        
<ERROR> *cmd_run* Package error: Neither library nor executable found, there is nothing to do
STOP 1
```

- `fpm.toml`修改如下

```toml
name = "math_constants"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline" 

[library]
source-dir = "source"  

[[executable]]
name = "math_constants"
source-dir = "application"
main = "main.f90"
```

- 运行结果正常

```shell
> fpm run        
 + mkdir build\dependencies
type_kinds.f90                         done.
fundamental.f90                        done.
derived.f90                            done.
math_constants.f90                     done.
libmath_constants.a                    done.
main.f90                               done.
math_constants.exe                     done.
[100%] Project compiled successfully.
 math_constants library demo
 pi =    3.1415926535897931
 2*pi =    6.2831853071795862
 pi/2 =    1.5707963267948966
 e =    2.7182818284590451
```

### 单元测试

*fpm* 还提供对单元测试的支持。
- 默认情况下，命令`fpm test`会使 *fpm* 在`test/main.f90`中查找程序进行测试
- 测试的处理方式与可执行文件几乎完全相同

#### 默认测试

- 项目结构

```shell
.
├── app
│   └── main.f90
├── fpm.toml
├── src
│   ├── math_constants
│   │   ├── derived.f90
│   │   └── fundamental.f90
│   ├── math_constants.f90
│   └── type_kinds.f90
└── test
    └── main.f90
```

- `test/main.f90`

```fortran
program main
    use math_constants, only: pi
    print *, "sin(pi) = ", sin(pi)
end program main
```

- 直接使用`fpm test`会构建可执行文件`math_constants.exe`和测试可执行文件`math_constants-test.exe`，并运行测试可执行文件

```shell
> fpm test       
 + mkdir build\dependencies
type_kinds.f90                         done.
fundamental.f90                        done.
derived.f90                            done.
math_constants.f90                     done.
libmath_constants.a                    done.
main.f90                               done.
main.f90                               done.
math_constants.exe                     done.
math_constants-test.exe                done.
[100%] Project compiled successfully.
 sin(pi) =    1.2246467991473532E-016
```

#### 自定义测试

- 在`fpm.toml`文件中可以显式定义测试
- `fpm.toml`

```toml
name = "math_constants"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline"  

[library]
source-dir = "src"  

[[executable]]
name = "math_constants"
source-dir = "app"
main = "main.f90"  

[[test]]
name = "runTests"
source-dir = "test"
main = "main.f90"
```

- 可以看到测试可执行文件发生了变化

```shell
> fpm test       
 + mkdir build\dependencies
type_kinds.f90                         done.
fundamental.f90                        done.
derived.f90                            done.
math_constants.f90                     done.
libmath_constants.a                    done.
main.f90                               done.
main.f90                               done.
math_constants.exe                     done.
runTests.exe                           done.
[100%] Project compiled successfully.
 sin(pi) =    1.2246467991473532E-016
```

### 依赖项

- 在`fpm.toml`中可以指定依赖项的位置，这里的依赖项是**项目**而非库
- Git库：`helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }`
    - 指定分支：`helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git", branch = "master" }`
    - 指定版本： `helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git", tag = "v1.2.3" }`
- 文件夹库：`helloff = { path = "helloff" }`

```toml
name = "math_constants"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline"  

[library]
source-dir = "src"  

[dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }  

[[executable]]
name = "math_constants"
source-dir = "app"
main = "main.f90"  

[[test]]
name = "runTests"
source-dir = "test"
main = "main.f90"
```

- `app/main.f90`

```fortran
program main
  use helloff, only: create_greeting
  use math_constants, only: e, pi, half_pi, two_pi
  print *, 'math_constants library demo'
  print *, 'pi = ', pi
  print *, '2*pi = ', two_pi
  print *, 'pi/2 = ', half_pi
  print *, 'e = ', e
  print *, create_greeting("fpm")
end program main
```

- 使用`fpm run`即可直接运行，过程中会从git自动下载相关库到`build/dependencies`，然后构建并运行

```shell
> fpm run
 + mkdir build\dependencies
Initialized empty Git repository in ./dependence/build/dependencies/helloff/.git/
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 9 (delta 0), reused 9 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (9/9), 828 bytes | 23.00 KiB/s, done.
From https://gitlab.com/everythingfunctional/helloff
 * branch            HEAD       -> FETCH_HEAD
type_kinds.f90                         done.
helloff.f90                            done.
fundamental.f90                        done.
derived.f90                            done.
math_constants.f90                     done.
libmath_constants.a                    done.
main.f90                               done.
math_constants.exe                     done.
[100%] Project compiled successfully.
 math_constants library demo
 pi =    3.1415926535897931
 2*pi =    6.2831853071795862
 pi/2 =    1.5707963267948966
 e =    2.7182818284590451
 Hello, fpm!
```

#### 指定依赖

- 可以为特定的可执行文件指定依赖，如`executable`或`test`
- 使用`[executable.dependencies]`可以指定为`executable`创建依赖

```toml
name = "math_constants"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline"  

[library]
source-dir = "src"

[[executable]]
name = "math_constants"
source-dir = "app"
main = "main.f90"
[executable.dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }  

[[test]]
name = "runTests"
source-dir = "test"
main = "main.f90"
```

- 还可以使用`[dev-dependencies]`使`executable`和`test`都可以使用依赖
- 这样的好处是使用该库的下游用户不会自动依赖上游库，不会影响下游使用

```toml
name = "math_constants"
version = "0.1.0"
license = "MIT"
author = "Alpraline"
maintainer = "alpraline1999@gmail.com"
copyright = "2025 Alpraline"

[library]
source-dir="src"

[dev-dependencies]
helloff = { git = "https://gitlab.com/everythingfunctional/helloff.git" }

[[ executable ]]
name="math_constants"
source-dir="app"
main="main.f90"

[[ test ]]
name="runTests"
source-dir="test"
main="main.f90"
```

### 自定义构建脚本

- `fpm.toml`支持自定义的构建脚本（如`makefile`等）

```toml
[library]
source-dir="src"
build-script="my_build_script"
```

- *fpm* 会设置以下环境变量，为构建脚本指定一些参数：
    - `FC` – 要使用的 Fortran 编译器
    - `FFLAGS` – 应传递给 Fortran 编译器的标志
    - `BUILD_DIR` – 编译文件的放置位置
    - `INCLUDE_DIRS` – 所有依赖项的文件夹，以空格分隔；构建脚本负责生成相应的引入标志
    - **注意**：所有文件和目录名称都使用其**完整的规范路径**指定
