# Some parts of this Rakefile were taken from underscore's Rakefile: https://github.com/documentcloud/underscore/blob/master/Rakefile

require 'rubygems'
require 'closure-compiler'

HEADER = /((^\s*\/\/.*\n)+)/

desc 'Minify cookie.js using the Google Closure Compiler.'
task :build do
    source = File.read('cookie.js')
    header = source.match(HEADER)
    min = Closure::Compiler.new.compress(source)
    File.open('cookie.min.js', 'w') do |file|
        file.write header[1] + min[0..-2]
    end
end