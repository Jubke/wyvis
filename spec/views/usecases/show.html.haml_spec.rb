require 'rails_helper'

RSpec.describe "usecases/show", :type => :view do
  before(:each) do
    @usecase = assign(:usecase, Usecase.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
