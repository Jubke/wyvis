require 'rails_helper'

RSpec.describe "usecases/edit", :type => :view do
  before(:each) do
    @usecase = assign(:usecase, Usecase.create!())
  end

  it "renders the edit usecase form" do
    render

    assert_select "form[action=?][method=?]", usecase_path(@usecase), "post" do
    end
  end
end
