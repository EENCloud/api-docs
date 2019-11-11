# Markdown
set :markdown_engine, :redcarpet
set :markdown,
    fenced_code_blocks: true,
    smartypants: true,
    disable_indented_code_blocks: true,
    prettify: true,
    tables: true,
    with_toc_data: true,
    no_intra_emphasis: true


# Assets
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :fonts_dir, 'fonts'


# Activate the syntax highlighter
activate :syntax
ready do
  require './lib/multilang.rb'
end


# Livereload
activate :livereload,
  :ignore => [/\.html$/],    # Ignore changes to .html
  :livereload_css_pattern => Regexp.new('.+\.scss$'),
  :livereload_css_target => nil,
  :apply_css_live => true,
  :apply_js_live => true,
  :host => 'localhost',
  :port => 4568


# Middleman Watcher 
# set :watcher_disable, true    # console notifications about filechanges


# Ignore listed files
set :file_watcher_ignore, [
        /^\.bundle\//,
        /^\.sass-cache\//,
        /^\.git\//,
        /^\.gitignore$/,
        /\.DS_Store/,
        /^build\//,
        /^\.rbenv-.*$/,
        /^Gemfile$/,
        /^Gemfile\.lock$/,
        /~$/,
        /(^|\/)\.?#/
    ]

# Autoprefixer
activate :autoprefixer do |config|
  config.browsers = ['last 2 version', 'Firefox ESR']
  config.cascade  = false
  config.inline   = true
end


# Github pages require relative links
activate :relative_assets
set :relative_links, true


# Build Configuration
configure :build do
  # If you're having trouble with Middleman hanging, commenting
  # out the following two lines has been known to help
  activate :minify_css
  activate :minify_javascript
  # activate :relative_assets
  # activate :asset_hash
  # activate :gzip
end


# Middleman Configuration
set :port, 4567
