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

        // 任务: 压缩插件配置 grunt-contrib-uglify 插件
        uglify: {
            options: {
                // 压缩后,js 首行 banner
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: false
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

        // 任务: css 压缩配置 grunt-contrib-cssmin 插件
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
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
                    // fonts 拷贝
                    {expand: true, cwd: "src/fonts/", src: ["**"], dest: "build/fonts/"},
                    // html 拷贝
                    {expand: true, cwd: "src/html/", src: ["options.html", "popup.html"], dest: "build/html/"},
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
                        cwd: "src/css/",
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
                replacements: [{
                    from: 'utility.js',
                    to: 'utility.min.js'
                }, {
                    from: 'background.js',
                    to: 'background.min.js'
                }, {
                    from: 'selection.js',
                    to: 'selection.min.js'
                }, {
                    from: "popup.js",
                    to: "popup.min.js"
                }, {
                    from: "base.css",
                    to: "base.min.css"
                },{
                    from: "selection.css",
                    to: "selection.min.css"
                }]
            },
            options_html: {
                src: ["build/html/options.html"],
                overwrite: true,
                replacements: [{
                    from: "options.js",
                    to: "options.min.js"
                }, {
                    from: "options.css",
                    to: "options.min.css"
                }]
            },
            popup_html: {
                src: ["build/html/popup.html"],
                overwrite: true,
                replacements: [{
                    from: "popup.js",
                    to: "popup.min.js"
                }, {
                    from: "utility.js",
                    to: "utility.min.js"
                }, {
                    from: "popup.css",
                    to: "popup.min.css"
                }, {
                    from: "icon.css",
                    to: "icon.min.css"
                }]
            },
            selection_css: {
                src: ["build/css/selection.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            },
            options_css: {
                src: ["build/css/options.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            },
            popup_css: {
                src: ["build/css/popup.min.css"],
                overwrite: true,
                replacements: [{from: "base.css", to: "base.min.css"}]
            }
        },

        // 任务: 监控资源热部署 grunt-contrib-watch 插件
        watch: {
            scripts: {
                files: "src/js/*.js",
                tasks: "uglify",
            },
            css: {
                files: "src/css/*.css",
                tasks: "cssmin"
            }
        }
    });

    // 启用 grunt-contrib-uglify 插件,压缩js文件
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // 启用 grunt-contrib-cssmin 插件,压缩css文件
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 启用 grunt-contrib-copy 插件,拷贝资源文件
    // grunt.loadNpmTasks("grunt-contrib-copy");
    // 启用 grunt-text-replace 插件,替换文本.
    // grunt.loadNpmTasks('grunt-text-replace');


    // 使用 load-grunt-tasks 代替自动 loadNpmTasks命令,自动加载需要的插件
    require("load-grunt-tasks")(grunt);

    // 默认指定的任务...
    grunt.registerTask("default", ["uglify", "cssmin", "copy", "replace"]);
    // check 检查任务
    grunt.registerTask("check", ["jshint"]);
    // debug 调试输出
    grunt.registerTask("debug", ["copy:main", "copy:test", "replace", "watch"]);

};
