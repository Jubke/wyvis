require "rails_helper"

RSpec.describe UsecasesController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/usecases").to route_to("usecases#index")
    end

    it "routes to #new" do
      expect(:get => "/usecases/new").to route_to("usecases#new")
    end

    it "routes to #show" do
      expect(:get => "/usecases/1").to route_to("usecases#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/usecases/1/edit").to route_to("usecases#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/usecases").to route_to("usecases#create")
    end

    it "routes to #update" do
      expect(:put => "/usecases/1").to route_to("usecases#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/usecases/1").to route_to("usecases#destroy", :id => "1")
    end

  end
end
