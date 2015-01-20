require 'rails_helper'

RSpec.describe "usecases/new", :type => :view do
  before(:each) do
    assign(:usecase, Usecase.new())
  end

  it "renders new usecase form" do
    render

    assert_select "form[action=?][method=?]", usecases_path, "post" do
    end
  end
end
