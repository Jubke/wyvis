class ScenarioDecorator < Draper::Decorator
  delegate_all
 
 # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end
  
  def hash_tags
    tags = ""
    object.data_types.each do |d|
      name = d.name
      tags = tags + h.content_tag( :span, '#' + name, class: 'badge scenario-tag data-type')
    end
    object.visualization_types.each do |d|
      name = d.name
      tags = tags + h.content_tag( :span, '#' + name, class: 'badge scenario-tag vis-type')
    end
    object.visualization_tasks.each do |d|
      name = d.name
      tags = tags + h.content_tag( :span, '#' + name, class: 'badge scenario-tag task')
    end
    return tags.html_safe
  end

end
