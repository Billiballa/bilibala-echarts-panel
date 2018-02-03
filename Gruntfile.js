/* eslint import/no-extraneous-dependencies: 0 */

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt); // eslint-disable-line

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    clean: ['dist'],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*.css', '**/*.html', '**/*.json', '!**/*.js', '!**/*.scss'],
        dest: 'dist',
      },
      libs: {
        cwd: 'libs',
        expand: true,
        src: ['**.*'],
        dest: 'dist/libs',
        options: {
          process: content => content.replace(/(\'|")echarts(\'|")/g, '$1./echarts.min$2'), // eslint-disable-line
        },
      },
      echarts_libs: {
        cwd: 'node_modules/echarts/dist',
        expand: true,
        src: ['echarts.min.js'],
        dest: 'dist/libs/',
      },
      liquidfill_libs: {
        cwd: 'node_modules/echarts-liquidfill/dist',
        expand: true,
        src: ['echarts-liquidfill.min.js'],
        dest: 'dist/libs/',
        options: {
          process: content => content.replace(/(\'|")echarts(\'|")/g, '$1./echarts.min$2'), // eslint-disable-line
        },
      },
      wordcloud_libs: {
        cwd: 'node_modules/echarts-wordcloud/dist',
        expand: true,
        src: ['echarts-wordcloud.min.js'],
        dest: 'dist/libs/',
        options: {
          process: content => content.replace(/(\'|")echarts(\'|")/g, '$1./echarts.min$2'), // eslint-disable-line
        },
      },
      img_to_dist: {
        cwd: 'src/images',
        expand: true,
        flatten: true,
        src: ['*.*'],
        dest: 'dist/images/',
      },
      pluginDef: {
        expand: true,
        src: ['README.md', 'plugin.json'],
        dest: 'dist',
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'src/plugin.json', 'README.md', '!src/node_modules/**', '!src/bower_components/**'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },

    babel: {
      options: {
        ignore: ['libs/*'],
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js',
        }],
      },
    },
  });

  grunt.registerTask('default', [
    'clean',
    'copy:src_to_dist',
    'copy:libs',
    'copy:echarts_libs',
    'copy:liquidfill_libs',
    'copy:wordcloud_libs',
    'copy:img_to_dist',
    'copy:pluginDef',
    'babel',
  ]);
};
