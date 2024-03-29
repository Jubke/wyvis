class VisualizationTypeDecorator < Draper::Decorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

  def image
    (object.image_url.nil? || object.image_url.empty?) ? h.content_tag(:span,"",class: "glyphicon glyphicon-picture") : h.image_tag(object.image_url)
  end

  def scenarios_badge
    if object.scenarios.length > 0
      h.content_tag(:span, h.pluralize(object.scenarios.length, "scenario"), class: 'badge')
    end
  end

  def implementations_badge
    if object.implementations.length > 0
      h.content_tag(:span, h.pluralize(object.implementations.length, "implementation"), class: 'badge')
    end
  end
end
