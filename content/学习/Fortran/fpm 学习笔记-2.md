---
created: 2025-03-27
modified: 2025-03-27
tags:
  - Fortran
  - fpm
finished: true
draft: false
---

## 第一个项目

- [First steps with fpm — Fortran Package Manager](https://fpm.fortran-lang.org/tutorial/hello-fpm.html)

```shell
> fpm new first_steps
 + mkdir first_steps
 + cd first_steps
 + mkdir first_steps\src
 + mkdir first_steps\app
 + mkdir first_steps\test
 + git config --get user.name > C:\Users\17768\AppData\Local\Temp\58
 + git config --get user.email > C:\Users\17768\AppData\Local\Temp\59
 + git config --get user.name > C:\Users\17768\AppData\Local\Temp\60
 + git init first_steps
Initialized empty Git repository in ./first_steps/.git/

> cd .\11_first_steps\

> fpm run
 + mkdir build\dependencies
first_steps.f90                        done.
libfirst_steps.a                       done.
main.f90                               done.
first_steps.exe                        done.
[100%] Project compiled successfully.
 Hello, first_steps!

> fpm test
check.f90                              done.
check.exe                              done.
[100%] Project compiled successfully.
 Put some tests in here!
```

## 添加依赖项

- [Adding dependencies — Fortran Package Manager](https://fpm.fortran-lang.org/tutorial/dependencies.html)

### 使用标准库`stdlib`

#### `fpm.toml`

```toml
name = "demo"
version = "0.1.0"

[dependencies]
stdlib = "*"
```

#### `src/demo.f90`

```fortran
module demo
  use stdlib_io, only : get_line
  use stdlib_strings, only : replace_all
  implicit none
  private

  public :: substitute

contains

  !> Read all lines from input, replace pattern and print it to output
  subroutine substitute(input, output, pattern, replacement)
    !> Formatted input unit
    integer, intent(in) :: input
    !> Formatted output unit
    integer, intent(in) :: output
    !> Pattern to replace in input
    character(len=*), intent(in) :: pattern
    !> Replacement for pattern in output
    character(len=*), intent(in) :: replacement

    character(len=:), allocatable :: line
    integer :: stat

    do
      call get_line(input, line, stat)
      if (stat /= 0) exit
      write(output, '(a)') replace_all(line, pattern, replacement)
    end do
  end subroutine substitute

end module demo
```

#### `app/main.f90`

```fortran
program main
  !> 标准输出单元 output_unit
  use, intrinsic :: iso_fortran_env, only : output_unit
  use demo, only : substitute
  implicit none
  character(len=256) :: pattern, replacement, input_file
  integer :: input

  call get_command_argument(1, pattern)
  call get_command_argument(2, replacement)
  call get_command_argument(3, input_file)

  open(newunit=input, file=input_file, status='old')
  call substitute(input, output_unit, trim(pattern), trim(replacement))
  close(input)
end program main
```

#### `fpm run`

```shell
> fpm run -- demo substitute fpm.toml
 + mkdir build\dependencies
Initialized empty Git repository in ./12_add_dep/build/dependencies/test-drive/.git/
remote: Enumerating objects: 31, done.
remote: Counting objects: 100% (31/31), done.
remote: Compressing objects: 100% (29/29), done.
remote: Total 31 (delta 5), reused 8 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (31/31), 31.43 KiB | 103.00 KiB/s, done.
From https://github.com/fortran-lang/test-drive
 * tag               v0.4.0     -> FETCH_HEAD
Initialized empty Git repository in ./12_add_dep/build/dependencies/stdlib/.git/
remote: Enumerating objects: 552, done.
remote: Counting objects: 100% (552/552), done.
remote: Compressing objects: 100% (436/436), done.
remote: Total 552 (delta 128), reused 384 (delta 115), pack-reused 0 (from 0)
Receiving objects: 100% (552/552), 1.91 MiB | 1.45 MiB/s, done.
Resolving deltas: 100% (128/128), done.
From https://github.com/fortran-lang/stdlib
 * branch            stdlib-fpm -> FETCH_HEAD
stdlib_kinds.f90                       done.
stdlib_system_subprocess.c             done.
stdlib_ascii.f90                       done.
stdlib_optval.f90                      done.
stdlib_error.f90                       done.
stdlib_string_type.f90                 done.
stdlib_strings.f90                     done.
stdlib_io.f90                          done.
f08estop.f90                           done.
demo.f90                               done.
stdlib_string_type_constructor.f90     done.
stdlib_strings_to_string.f90           done.
libdemo.a                              done.
main.f90                               done.
demo.exe                               done.
[100%] Project compiled successfully.
name = "substitute"
version = "0.1.0"

[dependencies]
stdlib = "*"
```

### 添加测试框架

#### `fpm.toml`

```toml
name = "demo"
version = "0.1.0"

[dependencies]
stdlib = "*"

[dev-dependencies]
test-drive.git = "https://github.com/fortran-lang/test-drive"
test-drive.tag = "v0.4.0"
```

#### `test/main.f90`

```fortran
module test_demo
  use demo, only : substitute
  use stdlib_io, only : get_line
  use testdrive, only : error_type, unittest_type, new_unittest, check
  implicit none
  private

  public :: collect_demo

contains

  !> Collect all exported unit tests
  subroutine collect_demo(testsuite)
    !> Collection of tests
    type(unittest_type), allocatable, intent(out) :: testsuite(:)

    testsuite = [new_unittest("substitute", test_substitute)]
  end subroutine collect_demo

  !> Check substitution of a single line
  subroutine test_substitute(error)
    !> Error handling
    type(error_type), allocatable, intent(out) :: error
    integer :: input, output, stat
    character(len=:), allocatable :: line
    open(newunit=input, status="scratch")
    write(input, '(a)') "This is a valid test"
    rewind(input)

    open(newunit=output, status="scratch")
    call substitute(input, output, "test", "example")
    close(input)

    rewind(output)
    call get_line(output, line, stat)
    close(output)

    call check(error, line, "This is a valid example")
  end subroutine test_substitute
end module test_demo

program tester
  !> 标准错误输出单元 error_out
  use, intrinsic :: iso_fortran_env, only : error_unit
  use testdrive, only : run_testsuite
  use test_demo, only : collect_demo
  implicit none
  integer :: stat

  stat = 0
  call run_testsuite(collect_demo, error_unit, stat)

  if (stat > 0) then
    write(error_unit, '(i0, 1x, a)') stat, "test(s) failed!"
    error stop
  end if

end program tester
```

#### `fpm test`

```shell
> fpm test
testdrive.F90                          done.
main.f90                               done.
libdemo.a                              done.
main.f90                               done.
demo.exe                               done.
demo-test.exe                          done.
[100%] Project compiled successfully.
  Starting substitute … (1/1)
       … substitute [PASSED]
```

### 指定依赖

- [[fpm 学习笔记-1#指定依赖]]

#### `fpm.toml`

```toml
name = "demo"
version = "0.1.0"

[dependencies]
stdlib = "*"

[dev-dependencies]
test-drive.git = "https://github.com/fortran-lang/test-drive"
test-drive.tag = "v0.4.0"

[[executable]]
name = "demo"
[executable.dependencies]
M_CLI2.git = "https://github.com/urbanjost/M_CLI2"
```

#### `app/main.f90`

```fortran
program main
  use, intrinsic :: iso_fortran_env, only : output_unit
  use demo, only : substitute
  use m_cli2, only : set_args, unnamed, sget
  implicit none
  character(len=:), allocatable :: input_file, output_file, pattern, replacement
  integer :: input, output, i

  call set_args("--output:o ''")

  output_file = trim(sget("output"))
  if (len(output_file) > 0) then
    open(file=output_file, newunit=output)
  else
    output = output_unit
  end if

  pattern = trim(unnamed(1))
  replacement = trim(unnamed(2))

  do i = 3, size(unnamed)
    input_file = trim(unnamed(i))
    open(file=input_file, newunit=input, status='old')
    call substitute(input, output_unit, trim(pattern), trim(replacement))
    close(input)
  end do

  if (output /= output_unit) close(output)
end program main
```

#### `fpm run`

```shell
> fpm run -- demo substitute fpm.toml
Initialized empty Git repository in ./12_add_dep/build/dependencies/M_CLI2/.git/
remote: Enumerating objects: 1395, done.
remote: Counting objects: 100% (1395/1395), done.
remote: Compressing objects: 100% (852/852), done.
remote: Total 1395 (delta 454), reused 1004 (delta 220), pack-reused 0 (from 0)
Receiving objects: 100% (1395/1395), 13.28 MiB | 1.76 MiB/s, done.
Resolving deltas: 100% (454/454), done.
From https://github.com/urbanjost/M_CLI2
 * branch            HEAD       -> FETCH_HEAD
M_CLI2.F90                             done.
libdemo.a                              done.
main.f90                               done.
demo.exe                               done.
[100%] Project compiled successfully.
name = "substitute"
version = "0.1.0"

[dependencies]
stdlib = "*"

[dev-dependencies]
test-drive.git = "https://github.com/fortran-lang/test-drive"
test-drive.tag = "v0.4.0"

[[executable]]
name = "substitute"
[executable.dependencies]
M_CLI2.git = "https://github.com/urbanjost/M_CLI2"
```

## 插件拓展

- [Extending fpm with plugins — Fortran Package Manager](https://fpm.fortran-lang.org/tutorial/plugins.html)

### 注册表搜索工具

- [fpm-search](https://github.com/urbanjost/fpm-search)插件用于查询软件包注册表
- 安装（自动安装到环境变量目录下）
- **我这fpm-search好像用不了，之后再看看**

```shell
git clone https://github.com/urbanjost/fpm-search
cd fpm-search
fpm install --profile release
```

## 使用OpenMP

- [Computing PI with OpenMP — Fortran Package Manager](https://fpm.fortran-lang.org/how-to/compute-pi-openmp.html)

### `app/main.f90`

```fortran
program compute_pi_openmp
  use, intrinsic :: iso_fortran_env, only: dp => real64, i8 => int64, real128
  use omp_lib
  implicit none
  integer(kind=i8) :: i, n_iterations
  real(kind=dp) :: delta, x, pi
  integer :: start, end
  integer :: num_threads  

  pi = 0.0_dp
  n_iterations = get_iterations(10000_i8)
  delta = 1.0_dp / n_iterations
  x = 0.0_dp

  print *, "please enter the number of threads"
  read(*,*) num_threads
  call omp_set_num_threads(num_threads)
  call system_clock(start)
  !$omp parallel default(none) private(x, i) shared(delta, n_iterations, pi)
  if (omp_get_thread_num() == 0) then
    write(*,*) "Number of threads in parallel region: ", omp_get_num_threads()
  end if
  !$omp do reduction(+:pi)
  do i = 1, n_iterations
    x = i * delta
    pi = pi + sqrt(1.0_dp - x**2)
  end do
  !$omp end do
  !$omp end parallel
  call system_clock(end)  

  pi = 4.0_dp * pi / n_iterations
  print "(A, I16, A, F25.15)", "Iterations: ", n_iterations, ", PI: ", pi
  print "(A, I8, A, ES8.1)", "Took: ", end - start, "ms, with absolute error: ", acos(-1.0_real128) - pi  

contains  

  integer(i8) function get_iterations(default_iterations)
    integer(kind=i8), intent(in) :: default_iterations
    character(len=100) :: buffer, msg
    integer :: stat  

    get_iterations = default_iterations
    if (command_argument_count() >= 1) then
      call get_command_argument(1, buffer)
      read (buffer, fmt=*, iostat=stat, iomsg=msg) get_iterations
      if (stat /= 0) stop msg
    end if
  end function get_iterations  

end program compute_pi_openmp
```

### `fpm.toml`

- OpenMP 是内置依赖（*built-in dependency*，i.e. *metapackage*）, 需要使用如下格式
- 更多*metapackages*：[Built-in dependencies (“Metapackages”)](https://fpm.fortran-lang.org/spec/metapackages.html).

```toml
name = "compute-pi-openmp"
version = "0.1.0"

[dependencies]
openmp = "*"

[[executable]]
name = "compute-pi-openmp"
```

### 构建和运行

- `fpm run`

```shell
> fpm run
 + mkdir build\dependencies
main.f90                               done.
compute-pi-openmp.exe                  done.
[100%] Project compiled successfully.
Iterations:            10000, PI:         3.141391477611323
Took:    0.000s, with absolute error:  2.0E-04
```

- 使用 `--profile-release` 启用编译器优化，并增加近似计算的迭代次数
- **这里我使用`--profile-release`有问题**

```shell
> fpm run -- 1000000000
Project is up to date
Iterations:       1000000000, PI:         3.141592651589699
Took:    1.812s, with absolute error:  2.0E-09
```

## [[fpm.toml 属性清单]]

- 主页：[Manifest reference — Fortran Package Manager](https://fpm.fortran-lang.org/spec/manifest.html)
- [name](https://fpm.fortran-lang.org/spec/manifest.html#project-name): The name of the project，项目的名称
- [version](https://fpm.fortran-lang.org/spec/manifest.html#project-version): The version of the project，项目的版本
- [license](https://fpm.fortran-lang.org/spec/manifest.html#project-license): The project license，项目许可证
- [maintainer](https://fpm.fortran-lang.org/spec/manifest.html#project-maintainer): Maintainer of the project，项目的维护者
- [author](https://fpm.fortran-lang.org/spec/manifest.html#project-author): Author of the project，项目的作者
- [copyright](https://fpm.fortran-lang.org/spec/manifest.html#project-copyright): Copyright of the project，项目版权
- [description](https://fpm.fortran-lang.org/spec/manifest.html#project-description): Description of the project，项目描述
- [categories](https://fpm.fortran-lang.org/spec/manifest.html#project-categories): Categories associated with the project，与项目关联的类别
- [keywords](https://fpm.fortran-lang.org/spec/manifest.html#project-keywords): Keywords describing the project，描述项目的关键字
- [homepage](https://fpm.fortran-lang.org/spec/manifest.html#project-homepage): The project’s homepage，项目的主页
- Build configuration，构建配置：
    - [auto-tests](https://fpm.fortran-lang.org/spec/manifest.html#automatic-target-discovery): Toggle automatic discovery of test executables，切换测试可执行文件的自动发现
    - [auto-examples](https://fpm.fortran-lang.org/spec/manifest.html#automatic-target-discovery): Toggle automatic discovery of example programs，切换示例程序的自动发现
    - [auto-executables](https://fpm.fortran-lang.org/spec/manifest.html#automatic-target-discovery): Toggle automatic discovery of executables，切换可执行文件的自动发现
    - [link](https://fpm.fortran-lang.org/spec/manifest.html#link-external-libraries): Link with external dependencies，与外部依赖项链接
    - [external-modules](https://fpm.fortran-lang.org/spec/manifest.html#use-system-installed-modules): Specify modules used that are not within your fpm package，指定使用的模块不在你的 fpm 包中
- Fortran configuration，Fortran 配置：
    - [implicit-typing](https://fpm.fortran-lang.org/spec/manifest.html#implicit-typing): Toggle default implicit typing，切换默认隐式类型
    - [implicit-external](https://fpm.fortran-lang.org/spec/manifest.html#implicit-external): Toggle implicit external interfaces，切换隐式外部接口
    - [source-form](https://fpm.fortran-lang.org/spec/manifest.html#source-form): Select source form for project，选择项目的源表单
- Target sections，目标部分：
    - [library](https://fpm.fortran-lang.org/spec/manifest.html#library-configuration) Configuration of the library target，库目标的配置
    - [executable](https://fpm.fortran-lang.org/spec/manifest.html#executable-targets) Configuration of the executable targets，可执行目标的配置
    - [test](https://fpm.fortran-lang.org/spec/manifest.html#test-targets) Configuration of the test targets，测试目标的配置
- Dependency sections，依赖项部分：
    - [dependencies](https://fpm.fortran-lang.org/spec/manifest.html#specifying-dependencies): Project library dependencies，项目库依赖项
    - [dev-dependencies](https://fpm.fortran-lang.org/spec/manifest.html#development-dependencies): Dependencies only needed for tests，仅测试所需的依赖项
- [install](https://fpm.fortran-lang.org/spec/manifest.html#installation-configuration): Installation configuration，安装配置
- [preprocess](https://fpm.fortran-lang.org/spec/manifest.html#preprocessor-configuration) Preprocessor configuration，预处理器配置
- [extra](https://fpm.fortran-lang.org/spec/manifest.html#additional-free-data-field): Additional free data field，额外的自由数据字段

## 内置依赖 (“Metapackages”)

- [Built-in dependencies (“Metapackages”) — Fortran Package Manager](https://fpm.fortran-lang.org/spec/metapackages.html)

### 调用方法

```toml
name = "my_openmp_package"
dependencies.openmp = "*"
```

或：

```
name = "my_openmp_package"
[dependencies]
openmp = "*"
```

### 内置依赖列表

- [stdlib](https://stdlib.fortran-lang.org/)：fortran-lang标准库
- **自动下载**

```toml
name = "with_stdlib"
dependencies.stdlib = "*"
```

- [minpack](https://github.com/fortran-lang/minpack)：现代化的 Minpack，用于求解非线性方程和非线性最小二乘问题]
- **自动下载**

```toml
name = "with_minpack"
dependencies.minpack = "*"
```

- OpenMP
- **本地安装**
- **自动添加适当的编译器标志**，以启用 OpenMP 支持编译和运行 fpm 目标

```toml
name = "my_openmp_package"
dependencies.openmp = "*"
```

- MPI
- **本地安装**

```toml
name = "my_parallel_app"
dependencies.mpi = "*"
```

- HDF5
- **本地安装**
- 使用`pkg-config`查找本地HDF5安装，需确保可用

```toml
name = "my_science_app"
dependencies.hdf5 = "*"
```
