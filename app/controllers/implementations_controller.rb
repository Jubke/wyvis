class ImplementationsController < ApplicationController
  expose(:usecase)
  expose(:usecase_view) { usecase.decorate }
  expose(:implementations) { ImplementationDecorator.decorate_collection(usecase.implementations) }
  expose(:implementation, attributes: :implementation_params)
  expose(:library) { implementation.library }

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

  # POST /usecases/1/implementations
  def create
    if implementation.save
      redirect_to usecase, notice: 'Implementation was successfully created.'
    else
      render :new
    end
  end

    # PATCH/PUT /implmentations/1
  def update
    if implementation.save
      redirect_to usecase_implementation_path(usecase,implementation), notice: 'Usecase was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /implementations/1
  def destroy
    implementation.destroy
    redirect_to usecase, notice: 'Implementation was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def implementation_params
      params.require(:implementation).permit(:library_id, :javascript, :stylesheet)
    end

    def impl_to_json(impl)
      impl.to_json(
        :include => [
          :usecase,
          :library
        ]
      )
    end
end
