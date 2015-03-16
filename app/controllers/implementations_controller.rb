class ImplementationsController < ApplicationController
  expose(:scenario)
  expose(:implementation, attributes: :implementation_params)
  expose(:package) { implementation.package }
  expose(:scenario_implementations) { ImplementationDecorator.decorate_collection(scenario.implementations) }

  def new
  end

  # GET /implementations/1
  # GET /implementations/1.js
  def show    
    render layout: 'wide_content'
  end

  def remote
    @implementation = Implementation.find( params[:id] ).decorate
    @index = params[:index]
    
    respond_to do |format|
      format.js
    end
  end

  # GET /implementations/compare/?ids[]
  def compare
    @implementations = ImplementationDecorator.decorate_collection( Implementation.find( params[:ids] ) )

    render layout: 'wide_content'
  end

  # GET /implmentations/1/frame
  def frame
    render layout: 'frame'
  end

  # GET /implmentations/1/edit
  def edit
  end

  # POST /scenarios/1/implementations
  def create
    if implementation.save
      redirect_to scenario, notice: 'Implementation was successfully created.'
    else
      render :new 
    end
  end

    # PATCH/PUT /implmentations/1
  def update
    if implementation.save
      redirect_to scenario_implementation_path(scenario,implementation), notice: 'Scenario was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /implementations/1
  def destroy
    implementation.destroy
    redirect_to scenario, notice: 'Implementation was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def implementation_params
      p = params.permit(:scenario_id)
      p.merge params.require(:implementation).permit(:package_id)
    end
end
