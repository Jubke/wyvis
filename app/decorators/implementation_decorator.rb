class ImplementationDecorator < Draper::Decorator
  delegate_all

  def lib_name
    object.library.name
  end

end
