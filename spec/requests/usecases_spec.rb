require 'rails_helper'

RSpec.describe "Usecases", :type => :request do
  describe "GET /usecases" do
    it "works! (now write some real specs)" do
      get usecases_path
      expect(response).to have_http_status(200)
    end
  end
end
