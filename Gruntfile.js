module.exports = function (grunt) {
    // 项目自动构建任务配置
    grunt.initConfig({
        // 读取 package.json 中属性
        pkg: grunt.file.readJSON("package.json"),

        // 任务: js 代码质量语法检查  grunt-contrib-jshint 插件
        jshint: {
            all: {
                src: ["src/js/*.js", "Gruntfile.js"],
                options: {
                    // 不使用 .jshintrc 定义约束
                    jshintrc: false,
                    // 自定义约束范围
                    globals: {
                        console: true,
                        document: true
                    }
                }
            }
        },

        // 任务: 清理目标文件夹
        clean: {
            before_build: {
                src: "build/*"
            },
            after_build: {
                src: "build/less"
            }
        },

        // 任务: 压缩插件配置 grunt-contrib-uglify 插件
        uglify: {
            options: {
                // 压缩后,js 首行 banner
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: false,
                compress:{
                    drop_console: true,
                    dead_code: true,
                    global_defs: {
                        'DEBUG': false
                    }
                }
            },
            // 默认编译任务 build
            build: {
                files: [{
                    expand: true,
                    cwd: "src/js",
                    src: ["*.js", "!*.min.js"],
                    dest: "build/js",
                    ext: ".min.js"
                }]
            }
        },

        // 任务: less文件拷贝
        less: {
            main: {
                options: {
                    // 不启用压缩
                    compress: false,
                    // 启用变量括号
                    strictMath: true,
                },
                files: [
                    // 输出 : 输入
                    {'build/less/selection.css': 'src/less/selection.less'},
                    {'build/less/options.css': 'src/less/options.less'},
                    {'build/less/popup.css': 'src/less/popup.less'},
                ]
            }
        },

        // 任务: css 压缩配置 grunt-contrib-cssmin 插件
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/less',
                    src: ['*.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },

        // 任务: 静态资源拷贝配置 grunt-contrib-copy 插件
        copy: {
            main: {
                files: [
                    // font 拷贝
                    {expand: true, cwd: "src/font/", src: ["**"], dest: "build/font/"},
                    // page 拷贝
                    {expand: true, cwd: "src/page/", src: ["options.html", "popup.html"], dest: "build/page/"},
                    // icon 拷贝
                    {expand: true, cwd: "src/icon/", src: ["**"], dest: "build/icon/"},
                    // js 工具拷贝
                    {expand: true, cwd: "src/js/", src: ["sha256.min.js"], dest: "build/js/"}
                ]
            },
            // 测试环境,不打包,仅拷贝
            test: {
                files: [
                    // js
                    {
                        expand: true,
                        cwd: "src/js/",
                        src: ["background.js", "options.js", "popup.js", "selection.js", "utility.js"],
                        dest: "build/js/",
                        rename: function (dest, src) {
                            // 修改名字 文件名.min.js
                            return dest + src.substring(0, src.indexOf('.')) + ".min" + src.substring(src.indexOf('.'), src.length);
                        }
                    },
                    // css
                    {
                        expand: true,
                        cwd: "build/less/",
                        src: ["**"],
                        dest: "build/css/",
                        rename: function (dest, src) {
                            // 修改名字 文件名.min.js
                            return dest + src.substring(0, src.indexOf('.')) + ".min" + src.substring(src.indexOf('.'), src.length);
                        }
                    },
                ]
            }
        },

        // 任务: 文本替换..  grunt-text-replace 插件
        replace: {
            manifest_json: {
                src: ["src/manifest.json"],
                dest: "build/manifest.json",
                replacements: [{from: 'utility.js', to: 'utility.min.js'},
                    {from: 'background.js', to: 'background.min.js'},
                    {from: 'selection.js', to: 'selection.min.js'},
                    {from: "popup.js", to: "popup.min.js"},
                    {from: "base.css", to: "base.min.css"},
                    {from: "selection.css", to: "selection.min.css"}]
            },
            options_html: {
                src: ["build/page/options.html"],
                overwrite: true,
                replacements: [{from: "options.js", to: "options.min.js"},
                    {from: "options.css", to: "options.min.css"}]
            },
            options_css: {
                src: ["build/css/options.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            },
            popup_html: {
                src: ["build/page/popup.html"],
                overwrite: true,
                replacements: [{from: "popup.js", to: "popup.min.js"},
                    {from: "utility.js", to: "utility.min.js"},
                    {from: "popup.css", to: "popup.min.css"},
                    {from: "icon.css", to: "icon.min.css"}]
            },
            popup_css: {
                src: ["build/css/popup.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            },
            selection_css: {
                src: ["build/css/selection.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            }
        },

        // 任务: 发布时,压缩为ZIP文件.
        compress: {
            main: {
                options: {
                    mode: "zip",
                    archive: "build/EasyZD.zip"
                },
                files: [
                    {expand: true, cwd: 'build/', src: ['**']}
                ]
            }
        },

        // 任务: 监控资源热部署 grunt-contrib-watch 插件
        watch: {
            copy: {
                files: ["src/font/**", "src/page/**", "src/icon/**"],
                tasks: ["copy:main", "replace"]
            },
            typeScript: {
                files: "src/ts/*.ts",
                tasks: ["ts"]
            },
            javaScript: {
                files: "src/js/*.js",
                tasks: ["copy:test", "replace"]
            },
            less: {
                files: "src/less/*.less",
                tasks: ["less"]
            },
            css: {
                files: "build/less/*.css",
                tasks: ["copy:test", "replace"]
            }
        }
    });

    // 启用 grunt-contrib-clean 插件,清除文件
    // grunt.loadNpmTasks("grunt-contrib-clean");
    // 启用 grunt-ts 插件, 将ts转为js
    // grunt.loadNpmTasks("grunt-ts");
    // 启用 grunt-contrib-uglify 插件,压缩js文件
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // 启用 grunt-contrib-less 插件,编译less文件为css
    // grunt.loadNpmTasks('grunt-contrib-less');
    // 启用 grunt-contrib-cssmin 插件,压缩css文件
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 启用 grunt-contrib-copy 插件,拷贝资源文件
    // grunt.loadNpmTasks("grunt-contrib-copy");
    // 启用 grunt-text-replace 插件,替换文本.
    // grunt.loadNpmTasks('grunt-text-replace');
    // 启用 grunt-contrib-compress 压缩ZIP
    // grunt.loadNpmTasks('grunt-contrib-compress');

    // 使用 load-grunt-tasks 代替自动 loadNpmTasks 命令, 自动加载需要的插件
    require("load-grunt-tasks")(grunt);

    // 默认指定的任务...生产打包编译
    grunt.registerTask("default", ["clean:before_build", "uglify", "less", "cssmin", "copy:main", "replace", "compress", "clean:after_build"]);
    // check 检查语法
    grunt.registerTask("check", ["jshint"]);
    // debug 调试输出
    grunt.registerTask("debug", ["clean:before_build", "less", "copy:main", "copy:test", "replace", "clean:after_build"]);

};
