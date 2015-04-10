class ScenariosController < ApplicationController
  expose(:scenarios)
  expose(:scenario, attributes: :scenario_params)
  expose(:scenario_dec) { scenario.decorate }
  expose(:implementations) {ImplementationDecorator.decorate_collection(scenario.implementations)}

  # GET /scenarios
  def index
  end

  # GET /scenarios/1
  def show
  end

  # GET /scenarios/new
  def new
  end

  # GET /implementations/compare/?ids[]
  def compare
    @implementations = ImplementationDecorator.decorate_collection( Implementation.where(id: params[:ids]).limit(2) )

    render layout: 'wide_content'
  end

  # GET /scenarios/1/edit
  def edit
  end

  # POST /scenarios
  def create
    if scenario.save
      redirect_to scenario, notice: 'Scenario was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /scenarios/1
  def update
    if scenario.save
      redirect_to scenario, notice: 'Scenario was successfully updated.'
    else
      render :edit 
    end
  end

  # DELETE /scenarios/1
  def destroy
    scenario.destroy
    redirect_to scenarios_url, notice: 'Scenario was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def scenario_params
      params.require(:scenario).permit(:name, :short, :description, :javascript)
    end
end
