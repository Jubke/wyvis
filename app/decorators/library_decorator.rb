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
    object.url_docs.nil? ? h.content_tag(:span, 'Documentation', class: 'not-available', title: 'Sorry, no link to the documentation available.') : h.link_to('Documentation', object.url_docs)
  end

  def link_url_code
    object.url_code.nil? ? h.content_tag(:span, 'Source', class: 'not-available', title: 'Sorry, no link to the source repository available.') : h.link_to('Source', object.url_code)
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
    object.latest_release.nil? ? "-" : object.latest_release
  end

  def first_release
    object.first_release.nil? ? "-" : object.first_release
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
end
