require 'rails_helper'

RSpec.describe "usecases/index", :type => :view do
  before(:each) do
    assign(:usecases, [
      Usecase.create!(),
      Usecase.create!()
    ])
  end

  it "renders a list of usecases" do
    render
  end
end
