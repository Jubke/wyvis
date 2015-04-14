class LibraryDecorator < Draper::Decorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end
  
  def render_tech
    object.render_tech * ", "
  end

  def link_url_docs
    object.url_docs.nil? ? h.content_tag(:span, 'Documentation', class: 'not-available', title: 'Sorry, no link to the documentation available.') : h.link_to('Documentation', object.url_docs, target: '_blank')
  end

  def link_url_code
    object.url_code.nil? ? h.content_tag(:span, 'Repository', class: 'not-available', title: 'Sorry, no link to the source repository available.') : h.link_to('Repository', object.url_code, target: '_blank')
  end

  def dependencies
    object.dependencies.empty? ? "-" : object.dependencies    
  end

  def current_version
    object.current_version.empty? ? "-" : object.current_version    
  end

  def license
    object.license.empty? ? "-" : object.license    
  end

  def latest_release
    if object.latest_release.nil? 
      return "-"
    else
      if(object.latest_release.month == 01 && object.latest_release.day == 01)
        return object.latest_release.year
      else
        return object.latest_release.nil? ? "-" : h.raw(h.time_ago_in_words(object.latest_release) +  ' ago,<br/>on ' + object.latest_release.readable_inspect)
      end
    end
  end

  def repo_created_at
    object.repo_created_at.nil? ? "-" : h.raw(h.time_ago_in_words(object.repo_created_at) +  ' ago,<br/>on ' + object.repo_created_at.readable_inspect)
  end

  def repo_pushed_at
    object.repo_pushed_at.nil? ? "-" : h.raw(h.time_ago_in_words(object.repo_pushed_at) +  ' ago,<br/>on ' + object.repo_pushed_at.readable_inspect)
  end

  def first_release
    object.first_release.nil? ? "-" : object.first_release.year
  end

  def image
    (object.image_url.nil? || object.image_url.empty?) ? h.content_tag(:span,"",class: "glyphicon glyphicon-picture") : h.image_tag(object.image_url)
  end

  def description
    object.description.empty? ? h.content_tag(:span, "Sorry, there is no description available. Check out the website instead.", class: "not-available") : object.description
  end

  def short
    object.description.empty? ? h.content_tag(:span, "Sorry, there is no description. Check the website instead.", class: "not-available") : h.truncate(object.description, length: 60)
  end

  def implementations_badge
    if object.implementations.length > 0
      h.content_tag(:span, h.pluralize(object.implementations.length, "implementation"), class: 'badge')
    end    
  end

  def repo_watchers_count
    (object.repo_watchers_count.nil?) ? nil : h.content_tag(:span, h.pluralize(object.repo_watchers_count, "watcher"), class: 'count')
  end

  def repo_stargazers_count
    (object.repo_stargazers_count.nil?) ? nil : h.content_tag(:span, h.pluralize(object.repo_stargazers_count, "star"), class: 'count')
  end

  def repo_forks_count
    (object.repo_forks_count.nil?) ? nil : h.content_tag(:span, h.pluralize(object.repo_forks_count, "fork"), class: 'count')
  end

  def repo_open_issues
    (object.repo_open_issues.nil?) ? nil : h.content_tag(:span, h.pluralize(object.repo_open_issues, "open issue"), class: 'count')
  end
end
