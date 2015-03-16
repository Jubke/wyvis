class ImplementationDecorator < Draper::Decorator
  delegate_all

  def lib_name
    object.package.name
  end

end
